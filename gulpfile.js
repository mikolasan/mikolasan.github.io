const { src, dest } = require('gulp')
const PluginError = require('plugin-error')
const Transform = require('stream').Transform;

const PLUGIN_NAME = 'gulp-lastmodifiedtime';

// work with streams https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/dealing-with-streams.md
// no use of through2, use Transform https://github.com/lazd/gulp-replace/blob/master/index.js
// get file content https://github.com/eugeneware/replacestream/blob/master/index.js
// https://github.com/sindresorhus/gulp-filter/blob/main/index.js

function addLastModifiedTime(options) {
  options = Object.assign({
    encoding: 'utf8',
  }, options);

  return new Transform({
    objectMode: true,
    transform(file, enc, callback) {
      if (file.isNull()) {
        this.emit('error', new PluginError(PLUGIN_NAME, 'File is null'));
        return callback();
      }

      if (file.isBuffer()) {
        // this.emit('error', new PluginError(PLUGIN_NAME, 'Buffers not supported!'));
        const chunk = file.contents.toString(options.encoding);
        const re = new RegExp(/---(.*?)---.*/s); // *? - non-greedy
        const found = chunk.match(re);
        if (found) {
          const frontmatter = found[1];
          const lines = frontmatter.split(/[\r\n]+/);
          const data = lines.filter(line => line.length > 0).map(line => line.split(':'));
          if (!data.find(e => e[0] === "date")) {
            console.log(data);
            return callback(null, file);
          }
        }
        return callback();
        
      }
      
      if (file.isStream()) {
        this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));
        return callback();
        // // define the streamer that will transform the content
        // var streamer = new Transform({
        //   transform(buf, enc, done) {
        //     const chunk = buf.toString(options.encoding);
        //     const re = new RegExp(/---(.*?)---.*/s); // *? - non-greedy
        //     const found = chunk.match(re);
        //     if (found) {
        //       const frontmatter = found[1];
        //       const lines = frontmatter.split(/[\r\n]+/);
        //       const data = lines.filter(line => line.length > 0).map(line => line.split(':'));
        //       if (!data.find(e => e[0] === "date")) {
        //         console.log(data);
        //         noDate = true;
        //         done(null, buf);
        //         return;
        //       }
        //     }
        //     done();
        //   }
        // });
        // // catch errors from the streamer and emit a gulp plugin error
        // streamer.on('error', () => { this.emit('error', new PluginError(PLUGIN_NAME, 'Streamer error')) });
        // streamer.on('data', (chunk) => {console.log(`get chunk`);});
        // // start the transformation
        // file.contents = file.contents.pipe(streamer);
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

exports.default = markdownNoDate