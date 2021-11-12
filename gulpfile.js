const { src, dest } = require('gulp')
const PluginError = require('plugin-error')
const Transform = require('stream').Transform;

const PLUGIN_NAME = 'gulp-lastmodifiedtime';

// https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/dealing-with-streams.md
// https://github.com/lazd/gulp-replace/blob/master/index.js
// https://github.com/eugeneware/replacestream/blob/master/index.js

function addLastModifiedTime(options) {
  options = Object.assign({
    encoding: 'utf8',
  }, options);

  return new Transform({
    objectMode: true,
    transform(file, enc, callback) {
      if (file.isNull()) {
        return callback(null, file);
      }

      if (file.isBuffer()) {
        this.emit('error', new PluginError(PLUGIN_NAME, 'Buffers not supported!'));
        return callback();
      }
      
      let noDate = false;
      if (file.isStream()) {
        // define the streamer that will transform the content
        var streamer = new Transform({
          transform(buf, enc, callback) {
            const chunk = buf.toString(options.encoding);
            const re = new RegExp(/---(.*?)---.*/s); // *? - non-greedy
            const found = chunk.match(re);
            if (found) {
              const frontmatter = found[1];
              const lines = frontmatter.split(/[\r\n]+/);
              const data = lines.filter(line => line.length > 0).map(line => line.split(':'))
              if (!data.find(e => e[0] === "date")) {
                console.log(data);
                noDate = true;
              }
            } 
            callback(null, chunk)

          }
        });
        // catch errors from the streamer and emit a gulp plugin error
        // streamer.on('error', () => { this.emit('error', new PluginError(PLUGIN_NAME, 'Streamer error')) });
        // let chunk = streamer.read();
        // console.log(chunk)
        // streamer.write( new Buffer.from('test'))
        // Use a loop to make sure we read all currently available data
        // while (null !== (chunk = streamer.read())) {
        //   console.log(`Read ${chunk.length} bytes of data...`);
        // }
        // start the transformation
        file.contents = file.contents.pipe(streamer);
      }

      // make sure the file goes through the next gulp plugin
      if (noDate) {
        this.push(file);
      }
      // tell the stream engine that we are done with this file
      callback(null, file);
    }
  })
}

function markdownNoDate(cb) {
  return src('src/markdown/**/*.md', { buffer: false })
    .pipe(addLastModifiedTime())
    .pipe(dest('noDate'))
}

exports.default = markdownNoDate