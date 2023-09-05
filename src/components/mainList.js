import React from "react"

const MainList = ({
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
  return (
    <main
      className={["centered", "language-" + languageName].join(" ")}
    >
      <div className="main-section">
        {children}
      </div>
    </main>
  )
}

export default MainList