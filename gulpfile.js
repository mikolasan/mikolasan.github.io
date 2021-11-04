const { src, dest } = require('gulp')
const through = require('through2')
const PluginError = require('plugin-error')

const PLUGIN_NAME = 'gulp-lastmodifiedtime';

function prefixStream(prefixText) {
  var stream = through();
  stream.write(prefixText);
  return stream;
}

function addLastModifiedTime(prefixText) {
  if (!prefixText) {
    throw new PluginError(PLUGIN_NAME, 'Missing prefix text!');
  }

  prefixText = new Buffer.from(prefixText); // allocate ahead of time

  const stream = through.obj((file, enc, cb) => {
    if (file.isBuffer()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Buffers not supported!'));
      return cb();
    }
    console.log(file.path)
    
    if (file.isStream()) {
      // define the streamer that will transform the content
      var streamer = prefixStream(prefixText);
      // catch errors from the streamer and emit a gulp plugin error
      streamer.on('error', this.emit.bind(this, 'error'));
      // start the transformation
      file.contents = file.contents.pipe(streamer);
    }

    // make sure the file goes through the next gulp plugin
    this.push(file);
    // tell the stream engine that we are done with this file
    cb();
  })

  return stream;
}

function markdownNoDate(cb) {
  return src('src/markdown/*.md')
    .pipe(addLastModifiedTime('test'))
    .pipe(dest('noDate'))
}

exports.default = markdownNoDate