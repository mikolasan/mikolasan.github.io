import React from "react"
import Layout from "../components/layout"
import HomeBlock from "../components/homeBlock"
import LogoButton from "../components/logoButton"
import ScrollSplit from "../components/scrollSplit"
import { articles } from "../home/november2024"
import { SEO } from "../components/seo"

const threeColumnLayout = (
  <div className="home-all">
    <LogoButton style="home-logo" />
    <div className="issue-line">
      <div className="issue-slogan"></div>
      <div className="issue-number">
        <h3>November 2024, Issue 6</h3>
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
          <img src="/images/home/nice-car.jpg" />
        </div>
      </div>
      <div className="home-right-column">
        <HomeBlock {...articles[5]} />
        <div className="home-small-headlines">
          <secion>
            <a href={articles[2].url}>
              <h1>
                {articles[2].title}
              </h1>
            </a>
          </secion>
          <secion>
            <a href={articles[3].url}>
              <h1>
                {articles[3].title}
              </h1>
            </a>
          </secion>
          <secion>
            <a href={articles[4].url}>
              <h1>
                {articles[4].title}
              </h1>
            </a>
          </secion>
        </div>
      </div>
    </div>

    <ScrollSplit>
      <h1>Latest</h1>
    </ScrollSplit>

    <div className="home-grid home-latest">
      <HomeBlock {...articles[6]} />
      <HomeBlock {...articles[7]} />
      <HomeBlock {...articles[8]} />
    </div>


  </div>
)

export default function Index({ pageContext }) {
  return (
    <Layout
      mainConf="fullscreen"
      section="root"
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
    title="November 2024, Issue 6"
  >

  </SEO>
)