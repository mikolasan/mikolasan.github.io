
const absPathToUrl = (absPath) => {
  const mdRoot = "/src/markdown"
  const startPos = absPath.search(mdRoot) + mdRoot.length
  const endPos = absPath.length - 3
  const path = absPath.substring(startPos, endPos)
  return path
}

const formatDate = (date, language) => {
  if (language === 'ru') {
    return new Date(Date.parse(date)).toLocaleDateString("ru-RU", { dateStyle: "full" })
  } else {
    return new Date(Date.parse(date)).toLocaleDateString("en-US", { dateStyle: "full" })
  }
}

const removeTrailingSlash = (str) => {
  if (str.charAt(str.length - 1) === '/') {
    return str.slice(-1);
  } else {
    return str;
  }
}

exports.absPathToUrl = absPathToUrl;
exports.formatDate = formatDate;
exports.removeTrailingSlash = removeTrailingSlash;