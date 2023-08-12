import React from "react"
import Layout from "../../components/ru/layout"

const RuNeuralNetworks = ({ pageContext }) => (
  <Layout
    title="Нейронные сети"
    section="neural-networks"
    crumbs={pageContext.breadcrumb.crumbs}
    languageName="Switch to english version"
    anotherLanguageLink="/"
    bannerParagraph={[
      <h1>Нейронные сети</h1>,
      <p>Попытка людей понять себя и формализовать свои маленькие нейрончики в надежде, 
        что все элеметарное - просто, а в совокупности они могут создавать невероятные выводы</p>
    ]}
  >
    <div>
    
    </div>
  </Layout>
)

export default RuNeuralNetworks
