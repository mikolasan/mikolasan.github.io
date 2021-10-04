import React from "react"
import Layout from "../../components/ruNewLayout"

const RuAbout = ({ pageContext }) => (
  <Layout
    title="О себе"
    section="about"
    crumbs={pageContext.breadcrumb.crumbs}
    languageName="Switch to english version"
    anotherLanguageLink="/about"
    bannerParagraph={[
      <h1>О себе</h1>,
      <p>Нейронные сети, байесовский вывод, разношёрстный девлог, паранормальные экспедиции, настольные игры и ролёвки, пиксель арт</p>
    ]}
  >
    <p>
    
    </p>
  </Layout>
)

export default RuAbout
