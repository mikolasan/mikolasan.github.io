import { default as React, useSyncExternalStore } from "react"
import Layout from "../components/layout"
import HomeBlock from "../components/homeBlock"
import { articles } from "../home/july2023"
import { windowSizeStore } from "../components/windowSizeStore"

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

const twoColumnLayout = (
  <div className="home_grid">
    <div className="home_grid_column_1">
      <HomeBlock {...articles[0]} />
      <HomeBlock {...articles[3]} />
      <HomeBlock {...articles[4]} />
      <HomeBlock {...articles[5]} />
    </div>
    <div className="home_grid_column_2">
      <HomeBlock {...articles[1]} />
      <HomeBlock {...articles[2]} />
    </div>
  </div>
)

export default function Index({ pageContext }) {
  const { height, width } = useSyncExternalStore(
    windowSizeStore.subscribe,
    windowSizeStore.getSnapshot,
    windowSizeStore.getServerSnapshot)
  return (
    <Layout
      mainConf="fullscreen"
      title="Robots, science, gamedev"
      section="root"
      languageName="Switch to russian version"
      anotherLanguageLink="/ru"
      recentArticles={pageContext.recentArticles}
    >
      {width > 1150 && threeColumnLayout || twoColumnLayout}
    </Layout>
  )
}

export { Head } from "./../components/head"