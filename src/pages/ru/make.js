import React from "react"
import Layout from "../../components/ruNewLayout"

const RuMake = ({ pageContext }) => (
  <Layout
    title="Мастерская"
    section="make"
    crumbs={pageContext.breadcrumb.crumbs}
    languageName="Switch to english version"
    anotherLanguageLink="/"
    bannerParagraph={[
      <h1>Мастерская</h1>,
      <p>Встраиваемые системы, маленькие компьютеры, пайка компонентов, 3Д печать - вот это всё</p>
    ]}
  >
    
  </Layout>
)

export default RuMake
