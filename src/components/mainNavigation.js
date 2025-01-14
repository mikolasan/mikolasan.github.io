import React from "react"
import { getImage, getSrc } from "gatsby-plugin-image"

import Reactions from "./reactions"
import RelatedArticles from "./recentArticles"
import Navigation from "./robot/navigation"

import Banner from "../components/banner"
import FeaturedImage from "../components/featuredImage"

const MainNavigation = ({
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
  featuredImage,
  title,
  bannerParagraph,

}) => {

  const imageData = getImage(featuredImage);
  const imageSrc = getSrc(featuredImage);

  const wideImage = (
    <FeaturedImage
      image={imageData}
      title={title}
      published={published}
      lastUpdated={lastUpdated}
    >
      {bannerParagraph}
    </FeaturedImage>
  )

  const banner = bannerParagraph && (
    <Banner
      published={published}
      publishedText={publishedText}
      lastUpdated={lastUpdated}
      updatedText={updatedText}
    >
      {bannerParagraph}
    </Banner>
  ) || ``
    

  const timeBlock = (published, lastUpdated, addClass) => {
    const time = <>
      {published && <span>{publishedText}<time id="_datePublished3" itemProp="datePublished" content={published}>{published}</time></span>}
      {lastUpdated && <span>{updatedText}<time>{lastUpdated}</time></span>}
    </>
    return (published || lastUpdated) && <div className={addClass}>
      {time}
    </div> || ` `
  }
  
  const toc = tableOfContents && (
    <div>
      <p className="table-of-contents title">Table of contents</p>
      <div className="table-of-contents" dangerouslySetInnerHTML={{ __html: tableOfContents }} />
    </div>) || ``

  return (
    <div className="nav-and-post">
      <Navigation />
      <main
        className={["centered", "language-" + languageName].join(" ")}
      >
        {featuredImage && wideImage || banner}
        <div className="left-section">
          {timeBlock(published, lastUpdated, "left-time-block")}
          {toc}
        </div>
        <div className="main-section">
          {children}
          {showLikes && (
            <Reactions
              slug={slug}
              errorCallback={errorCallback}
            />
          )}
        </div>
        <RelatedArticles
          section={section}
          subsection={subsection}
          nodes={recentArticles}
        />
      </main>
    </div>
  )
}

export default MainNavigation;