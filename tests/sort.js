const nifty = require("../src/nifty")

const testData = [
  {
    fileAbsolutePath: '/src/markdown/travel/turkey/1.html',
    frontmatter: { date: '2023-06-13T00:00:00.000Z'}
  },
  {
    fileAbsolutePath: '/src/markdown/devlog/2.html',
    frontmatter: { date: '2023-07-13T00:00:00.000Z'}
  },
  {
    fileAbsolutePath: '/src/markdown/ai/1.html',
    frontmatter: { date: '2023-06-13T00:00:00.000Z'}
  },
  {
    fileAbsolutePath: '/src/markdown/devlog/1.html',
    frontmatter: { date: '2023-06-13T00:00:00.000Z'}
  },
]


const sectionRegexp = new RegExp(/\/(.*)\//s);

const compareSectionAndDate = (a, b) => {
  const pathA = nifty.absPathToUrl(a.fileAbsolutePath)
  const matchA = pathA.match(sectionRegexp);
  const sectionA = matchA && matchA[1];
  const pathB = nifty.absPathToUrl(b.fileAbsolutePath)
  const matchB = pathB.match(sectionRegexp);
  const sectionB = matchB && matchB[1];
  console.log("compareSectionAndDate", sectionA, sectionB)
  if (sectionA !== sectionB) {
    return a.fileAbsolutePath.localeCompare(b.fileAbsolutePath)
  } else {
    return new Date(a.frontmatter.date) - new Date(b.frontmatter.date)
  }
}


testData.sort(compareSectionAndDate)

for (const r of testData) {
  console.log(`${r.fileAbsolutePath} - ${r.frontmatter.date}`)
}

// Expected output:
//
// /src/markdown/ai/1.html - 2023-06-13T00:00:00.000Z
// /src/markdown/devlog/1.html - 2023-06-13T00:00:00.000Z
// /src/markdown/devlog/2.html - 2023-07-13T00:00:00.000Z
// /src/markdown/travel/turkey/1.html - 2023-06-13T00:00:00.000Z
