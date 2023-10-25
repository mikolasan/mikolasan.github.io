
const absPathToUrl = (absPath, src_dir = "markdown") => {
  const regex = new RegExp(String.raw`\/src\/${src_dir}(.*)\..*`)
  const match = absPath.match(regex)
  if (match && match.length > 0) {
    return match[1]
  }
  // const mdRoot = "/src/markdown"
  // const startPos = absPath.search(mdRoot) + mdRoot.length
  // const endPos = absPath.length - 3 // only works for .md/.js but not .html
  // const path = absPath.substring(startPos, endPos)
  // return path
}

const formatDate = (date, language) => {
  if (language === 'ru') {
    return new Date(Date.parse(date)).toLocaleDateString("ru-RU", { dateStyle: "full" })
  } else {
    return new Date(Date.parse(date)).toLocaleDateString("en-US", { dateStyle: "full" })
  }
}

const removeTrailingSlash = str => {
  if (str.charAt(str.length - 1) === '/') {
    return str.slice(0, -1);
  } else {
    return str;
  }
}

const addHtmlToPath = path => path.endsWith(".html") ? path : `${path}.html`

const removeHtmlExtension = path => 
  path.endsWith("index.html") ?
    path.substring(0, path.length - 10) :
    path.endsWith(".html") ?
      path.substring(0, path.length - 5) :
      path

exports.absPathToUrl = absPathToUrl;
exports.addHtmlToPath = addHtmlToPath;
exports.formatDate = formatDate;
exports.removeHtmlExtension = removeHtmlExtension;
exports.removeTrailingSlash = removeTrailingSlash;