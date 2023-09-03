import React from "react"
import Layout from "../components/layout"
import HomeBlock from "../components/homeBlock"
import { articles } from "../home/july2023"

const threeColumnLayout = (
  <div className="home_grid">
    <div className="home_grid_column_1">
      <HomeBlock {...articles[0]} />
      <HomeBlock {...articles[3]} />
    </div>
    <div className="home_grid_column_2">
      <HomeBlock {...articles[1]} />
      <HomeBlock {...articles[4]} />
    </div>
    <div className="home_grid_column_3 wide">
      <HomeBlock {...articles[2]} />
      <HomeBlock {...articles[5]} />
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

export { Head } from "./../components/head"