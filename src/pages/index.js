import React from "react"
import Layout from "../components/layout"
import { articles } from "../home/october"

const Index = ({ pageContext }) => (
  <Layout
    mainConf="fullscreen"
    title="Robots, science, gamedev"
    section="root"
    languageName="Switch to russian version"
    anotherLanguageLink="/ru"
    recentArticles={pageContext.recentArticles}
  >
    <div className="home_grid">
      {articles.map(({style, title, subtitle, url, excerpt, readMore, imgSrc, imgAlt}) =>
        <section className={"home_grid_" + style}>
          <a className="home_card_image" href={url}>
            {imgSrc && <img src={imgSrc} alt={imgAlt} />}
            <h1>{title}</h1>
          </a>
          <p className="home_subtitle">{subtitle}</p>
          <div
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
          {readMore && <a href={url}>{readMore}</a>}
        </section>
      )}
    </div>
  </Layout>
)

export default Index

