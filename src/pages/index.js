import React from "react"
import Layout from "../components/layout"
import HomeBlock from "../components/homeBlock"
import ScrollSplit from "../components/scrollSplit"
import { articles } from "../home/july2023"
import { SEO } from "../components/seo"

const threeColumnLayout = (
  <div>
    <div className="centered">
      <div className="main-section">
        <h3>February 2024, Issue 5</h3>
      </div>
    </div>
    
    <div className="centered">
      <div className="main-section">
        <HomeBlock {...articles[0]} />
      </div>
    </div>

    <ScrollSplit>
      <h1>Science</h1>
    </ScrollSplit>

    <div className="centered">
      <div className="main-section">
        <HomeBlock {...articles[1]} />
        <HomeBlock {...articles[2]} />
      </div>
    </div>

    <ScrollSplit>
      <h1>Make</h1>
    </ScrollSplit>

    <div className="centered">
      <div className="main-section">
        <HomeBlock {...articles[3]} />
        <HomeBlock {...articles[4]} />
        <HomeBlock {...articles[5]} />
      </div>
    </div>
  </div>
)

export default function Index({ pageContext }) {
  return (
    <Layout
      mainConf="fullscreen"
      title="Robots, science, gamedev"
      section="root"
      languageName="Switch to russian version"
      anotherLanguageLink="/ru"
      recentArticles={pageContext.recentArticles}
    >
      {threeColumnLayout}
    </Layout>
  )
}

export const Head = ({ location, data, pageContext }) => (
  <SEO 
    path={location.pathname}
    data={data}
    frontmatter={data?.markdownRemark?.frontmatter}
    pageContext={pageContext}
    title="AI"
  >

  </SEO>
)