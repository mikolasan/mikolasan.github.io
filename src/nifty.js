
const absPathToUrl = (absPath) => {
  const mdRoot = "/src/markdown"
  const startPos = absPath.search(mdRoot) + mdRoot.length
  const endPos = absPath.length - 3
  const path = absPath.substring(startPos, endPos)
  return path
}

exports.absPathToUrl = absPathToUrl;