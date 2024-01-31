import React from "react"
import Layout from "../components/layout"
import HomeBlock from "../components/homeBlock"
import ScrollSplit from "../components/scrollSplit"
import { articles } from "../home/february2024"
import { SEO } from "../components/seo"

const threeColumnLayout = (
  <div className="home-all">
    <div className="issue-line">
      <div className="issue-slogan"></div>
      <div className="issue-number">
        <h3>February 2024, Issue 5</h3>
      </div>
      <div className="issue-date"></div>
    </div>
    
    <div className="home-grid">
      <div className="home-first-block">
        <div className="home-left-column">
          <HomeBlock {...articles[0]} />
          <HomeBlock {...articles[1]} />
        </div>
        <div className="home-image">
          <img src="/images/home/backpack-with-brains-at-the-San-Francisco-Museum-of-Modern-Art.jpg" />
        </div>
      </div>
      <div className="home-right-column">
        <HomeBlock {...articles[5]} />
        <div className="home-small-headlines">
          <HomeBlock {...articles[2]} />
          <HomeBlock {...articles[3]} />
        </div>
      </div>
    </div>

    <ScrollSplit>
      <h1>Latest</h1>
    </ScrollSplit>

    <div className="centered">
      <div className="main-section">
        <HomeBlock {...articles[4]} />
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