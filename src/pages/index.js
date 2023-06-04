import { default as React, useSyncExternalStore } from "react"
import Layout from "../components/layout"
import HomeBlock from "../components/homeBlock"
import { articles } from "../home/october"

function useWindowDimensions() {
  // the 3rd parameter is optional and only needed for server side rendering
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function subscribe(callback) {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
}

function getSnapshot() {
  return { width: window.innerWidth, height: window.innerHeight };
}

function getServerSnapshot() {
  return {
    width: 0,
    height: 0,
  };
}

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
      <div className="home_grid_column_1">
        <HomeBlock {...articles[0]} />
        <div className="home_grid_row_2">
          <HomeBlock {...articles[3]} />
          <div className="home_grid_column_3">
            <HomeBlock {...articles[4]} />
            <HomeBlock {...articles[5]} />
          </div>
        </div>
      </div>
      <div className="home_grid_column_2">
        <HomeBlock {...articles[1]} />
        <div className="home_grid_row_2 ">
          <HomeBlock {...articles[2]} />
        </div>
      </div>
      <div className="home_grid_column_3 wide">
        <HomeBlock {...articles[2]} />
      </div>
    </div>
  </Layout>
)

export default Index

export { Head } from "./../components/head"