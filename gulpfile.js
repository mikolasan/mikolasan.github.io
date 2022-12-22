const { series, src, dest } = require('gulp');
const through = require('through2');
const PluginError = require('plugin-error');
const Transform = require('stream').Transform;
const { exec } = require('child_process');

const PLUGIN_NAME = 'gulp-lastmodifiedtime';

// work with streams https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/dealing-with-streams.md
// no use of through2, use Transform https://github.com/lazd/gulp-replace/blob/master/index.js
// get file content https://github.com/eugeneware/replacestream/blob/master/index.js
// https://github.com/sindresorhus/gulp-filter/blob/main/index.js
// last modified time https://stackoverflow.com/questions/4784575/how-do-i-find-the-most-recent-git-commit-that-modified-a-file
// first published time https://stackoverflow.com/questions/11533199/git-find-commit-where-file-was-added
// git log https://git-scm.com/docs/git-log
// gulp git https://github.com/stevelacy/gulp-git/blob/master/lib/exec.js
// file content manipulation https://github.com/mikehazell/gulp-inject-string/blob/master/index.js

function justCheckingWorker(logMessage) {
  return new Transform({
    objectMode: true,
    transform(file, enc, callback) {
      const path = file.path;
      console.log(`${logMessage} ${path}`);
      callback(null, file);
    }
  })
}

function filterByFrontmatterField(field, options) {
  options = Object.assign({
    encoding: 'utf8',
    notFound: true,
  }, options);
  const { notFound } = options;

  return new Transform({
    objectMode: true,
    transform(file, enc, callback) {
      if (file.isNull()) {
        this.emit('error', new PluginError(PLUGIN_NAME, 'File is null'));
        return callback();
      } else if (file.isStream()) {
        this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));
        return callback();
      } else  if (file.isBuffer()) {
        const chunk = file.contents.toString(options.encoding);
        const re = new RegExp(/---(.*?)---.*/s); // *? - non-greedy
        const found = chunk.match(re);
        if (!found) {
          this.emit('error', new PluginError(PLUGIN_NAME, `No frontmatter found in ${file.path}`));
          return callback();
        }
        const frontmatter = found[1];
        const lines = frontmatter.split(/[\r\n]+/);
        const data = lines.filter(line => line.length > 0).map(line => line.split(':'));
        const fieldFound = data.find(e => e[0] === field) !== undefined;
        return callback(null, !(fieldFound ^ (!notFound)) ? file : null);
      }
      callback();
    }
  })
}

function execChildProcess(options) {
  options = Object.assign({
    encoding: 'utf8',
    gitRoot: process.cwd(),
    errorHook: (error, stream) => {
      console.log(error.stack);
      console.log('Error code: '+error.code);
      console.log('Signal received: '+error.signal);
      stream.emit('error', new PluginError(PLUGIN_NAME, 'git error'));
    }
  }, options);

  const transform = function(file, enc, cb) {
    let path = file.path;
    if (path.includes(options.gitRoot)) {
      path = path.substring(options.gitRoot.length + 1);
    }
    const self = this;
    const childProcess = exec(options.cmd(path), function (error, stdout, stderr) {
      if (error) {
        options.errorHook(error, self);
        return cb();
      }
      options.stdoutHook(stdout, file, self, options);
      return cb();
    });
  };
  const flush = function(cb) {
    cb();
  };

  return through.obj(transform, flush);
}

const addFrontmatterLine = (name, value, file) => {
  const chunk = String(file.contents);
  const re = new RegExp(/---(.*?)---.*/sd); // *? - non-greedy, d - add indices to the output
  const match = chunk.match(re);
  if (match) {
    const frontmatter = match[1];
    const lines = frontmatter.split(/[\r\n]+/);
    const data = lines.filter(line => line.length > 0).map(line => line.split(':'));
    const dataIndex = data.findIndex(e => e[0].trim() === name);
    let newFrontmatter = frontmatter;
    // if (dataIndex !== -1) {
    //   console.log(data[dataIndex][1], value, data[dataIndex][1].trim() !== value)
    // }
    if (dataIndex === -1) {
      newFrontmatter = frontmatter + `${name}: ${value}\r\n`;
    } else if (data[dataIndex][1].trim() !== value) {
      const re2 = new RegExp(`${name}\\s*:\\s*([\\d-]+)`);
      newFrontmatter = frontmatter.replace(re2, (match, p1, offset, string) => {
        return `${name}: ${value}`
      })
      // console.log(frontmatter, newFrontmatter)
    }
    const newChunk = chunk.substring(0, match.indices[1][0]) 
      + newFrontmatter
      + chunk.substring(match.indices[1][1]);
    file.contents = Buffer.from(newChunk);
  }
}

function setLastModifiedGitTime() {
  return execChildProcess({
    cmd: (path) => `git log -n 1 --pretty=format:%as -- ${path}`,
    excludeDates: new Set(['2021-11-23', '2022-05-10', '2022-12-21']),
    stdoutHook: (stdout, file, stream, options) => {
      const lastModified = String(stdout).trim();
      if (options.excludeDates !== undefined && !options.excludeDates.has(lastModified)) {
        addFrontmatterLine('lastModified', lastModified, file);
      }
      stream.push(file);
    }
  });
}

function addPublishedGitTime() {
  return execChildProcess({
    cmd: (path) => `git log --diff-filter=A --pretty=format:%as -- ${path} | sort | head -1`,
    stdoutHook: (stdout, file, stream) => {
      const published = String(stdout).trim();
      addFrontmatterLine('published', published, file);
      stream.push(file);
    }
  });
}

function markdownAddPublished(cb) {
  return src('src/markdown/**/*.md', { buffer: true })
    .pipe(filterByFrontmatterField('published', { notFound: true}))
    .pipe(addPublishedGitTime())
    .pipe(dest('noDate'))
}

function markdownUpdateLastModified(cb) {
  return src('src/markdown/**/*.md', { buffer: true })
    .pipe(setLastModifiedGitTime())
    .pipe(dest('noDate'))
}

function markdownUpdateDates(cb) {
  return src('src/markdown/**/*.md', { buffer: true })
    .pipe(addPublishedGitTime())
    .pipe(setLastModifiedGitTime())
    .pipe(dest('src/markdown'))
}

exports.markdownAddPublished = markdownAddPublished;
exports.markdownUpdateLastModified = markdownUpdateLastModified;
// exports.default = series(markdownAddPublished, markdownUpdateLastModified);
exports.default = markdownUpdateDates