import React from "react"

import Reactions from "./reactions"
import RelatedArticles from "./recentArticles"

const MainCentered = ({
  children,
  slug,
  section,
  subsection,
  tableOfContents,
  languageName,
  publishedText,
  published,
  updatedText,
  lastUpdated,
  showLikes,
  recentArticles,
  errorCallback,
}) => {
  const timeBlock = (published, lastUpdated, addClass) => {
    const time = <>
      {published && <span>{publishedText}<time id="_datePublished3" itemProp="datePublished" content={published}>{published}</time></span>}
      {lastUpdated && <span>{updatedText}<time>{lastUpdated}</time></span>}
    </>
    return (published || lastUpdated) && <div className={addClass + " time-block"}>
      {time}
    </div> || ` `
  }
  
  const toc = tableOfContents && (
    <div>
      <p className="table-of-contents title">Table of contents</p>
      <div className="table-of-contents" dangerouslySetInnerHTML={{ __html: tableOfContents }} />
    </div>) || ``

  return (
    <main
      className={["centered", "language-" + languageName].join(" ")}
    >
      <div className="left-section">
        {timeBlock(published, lastUpdated, "left-time-block")}
        {toc}
      </div>
      <div className="main-section">
        {children}
        {showLikes && (
          <>
            <Reactions
              slug={slug}
              errorCallback={errorCallback}
            />
          </>
        )}
      </div>
      <RelatedArticles
        section={section}
        subsection={subsection}
        nodes={recentArticles}
      />
    </main>
  )
}

export default MainCentered;