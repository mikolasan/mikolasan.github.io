const { series, src, dest } = require('gulp')
const PluginError = require('plugin-error')
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

function addLastModifiedTime(options) {
  options = Object.assign({
    encoding: 'utf8',
    gitRoot: process.cwd(),
  }, options);

  return new Transform({
    objectMode: true,
    transform(file, enc, callback) {
      if (file.isNull()) {
        this.emit('error', new PluginError(PLUGIN_NAME, 'File is null'));
        return callback();
      }

      if (file.isBuffer()) {
        const chunk = file.contents.toString(options.encoding);
        const re = new RegExp(/---(.*?)---.*/s); // *? - non-greedy
        const found = chunk.match(re);
        if (found) {
          const frontmatter = found[1];
          const lines = frontmatter.split(/[\r\n]+/);
          const data = lines.filter(line => line.length > 0).map(line => line.split(':'));
          if (!data.find(e => e[0] === "date")) {
            let path = file.path;
            if (path.includes(options.gitRoot)) {
              path = path.substring(options.gitRoot.length + 1);
            }
            // console.log(data);
            // console.log(path);

            const gitLogFirst = exec(`git log --pretty=format:%as --diff-filter=A -- ${path}`, function (error, stdout, stderr) {
              if (error) {
                console.log(error.stack);
                console.log('Error code: '+error.code);
                console.log('Signal received: '+error.signal);
                this.emit('error', new PluginError(PLUGIN_NAME, 'git error'));
                return callback();
              }
              console.log('Child Process STDOUT: '+stdout);
              const published = stdout;
              const file_1 = file
              const gitLogLast = exec(`git log -n 1 --pretty=format:%as -- ${path}`, function (error, stdout, stderr) {
                if (error) {
                  console.log(error.stack);
                  console.log('Error code: '+error.code);
                  console.log('Signal received: '+error.signal);
                  this.emit('error', new PluginError(PLUGIN_NAME, 'git error'));
                  return callback();
                }
                console.log('Child Process STDOUT: '+stdout);
                const lastModified = stdout;
                // chunk += new Buffer.from(lastModified);
                // console.log('Child Process STDERR: '+stderr);
                
                console.log(file_1.path)
                return callback(null, file_1);
              });

            });
            
            // ls.on('exit', function (code) {
            //   console.log('Child process exited with exit code '+code);
            // });
            
            // return callback(null, file);
          }
          return;
        } else {
          this.emit('error', new PluginError(PLUGIN_NAME, `No frontmatter found in ${file.path}`));
          return callback();
        }        
      }
      
      if (file.isStream()) {
        this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));
        return callback();
      }
      
      callback();
    }
  })
}

function justCheckingWorker(logMessage) {
  return new Transform({
    objectMode: true,
    transform(file, enc, callback) {
      const path = file.path;
      console.log(`${logMessage} ${file.path}`);
      callback(null, file);
      // callback();
    }
  })
}

function markdownNoDate(cb) {
  return src('src/markdown/**/*.md', { buffer: true })
    .pipe(addLastModifiedTime())
    .pipe(justCheckingWorker('just checking 1'))
    // .pipe(justCheckingWorker('just checking 2'))
    .pipe(dest('noDate'))
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

function addPublishedGitTime(field, options) {
  options = Object.assign({
    encoding: 'utf8',
    gitRoot: process.cwd(),
  }, options);

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
        let path = file.path;
        if (path.includes(options.gitRoot)) {
          path = path.substring(options.gitRoot.length + 1);
        }
        const published = stdout;
        const gitLogLast = exec(`git log -n 1 --pretty=format:%as -- ${path}`, function (error, stdout, stderr) {
          if (error) {
            console.log(error.stack);
            console.log('Error code: '+error.code);
            console.log('Signal received: '+error.signal);
            this.emit('error', new PluginError(PLUGIN_NAME, 'git error'));
            return callback();
          }
          console.log('Child Process STDOUT: '+stdout);
          const lastModified = stdout;
          // chunk += new Buffer.from(lastModified);
          // console.log('Child Process STDERR: '+stderr);
          
          console.log(file_1.path)
          return callback(null, file_1);
        });
      }
      callback();
    }
  })
}

function markdownAddPublished(cb) {
  return src('src/markdown/**/*.md', { buffer: true })
    .pipe(filterByFrontmatterField("published", { notFound: true}))
    .pipe(addPublishedGitTime())
    .pipe(justCheckingWorker('just checking 1'))
    // .pipe(dest('noDate'))
}

function markdownUpdateLastModified(cb) {
  return src('src/markdown/**/*.md', { buffer: true })
    // .pipe(setLastModifiedGitTime())
    // .pipe(dest('noDate'))
}

exports.markdownAddPublished = markdownAddPublished;
exports.markdownUpdateLastModified = markdownUpdateLastModified;
exports.default = series(markdownAddPublished, markdownUpdateLastModified);