import React from "react"
import Layout from "../../components/layout"
import { SEO } from "../../components/seo"
import { init_interface } from "../../components/slots/interface"
import { init_reels } from "../../components/slots/tech-reels"
import * as styles from "../../components/slots/index.module.css"

class TechStackSmack extends React.Component {
  componentDidMount() {
    init_reels();
    init_interface();
  }

  render() {
    return (
      <Layout
        title="Tech Stack Smack"
        section="slots"
      >
        <p>
          You can only pick 5.
          New version based on a tweet from <a href="https://twitter.com/chriskalmar/status/1459066591912640529" target="_blank" rel="external nofollow noopener noreferrer">Chis Kalmar</a>
        </p>
        <p>
          Essentially any project has backend, frontend, some storage or database, it uses a protocol and has a killer feature.
          Each reel in this slot machine represents a part from a typical project.
          Normally developers like to use the same language across all parts to spend minimum time setting up only one environment.
        </p>

        
        
        <div>
          <canvas className={styles.slotmachine} id="reels"></canvas>
          <canvas className={styles.slotmachine} id="ui"></canvas>
          <h2>The result</h2>
          <div id="slot-machine-result"><p>No results. Press "Spin" to get new ideas.</p></div>
        </div>
      </Layout>
    )
  }
}

export default TechStackSmack

export const Head = ({ location, data, pageContext }) => (
  <SEO 
    path={location.pathname}
    data={data}
    frontmatter={data?.markdownRemark?.frontmatter}
    pageContext={pageContext}
    title="Tech Stack Smack"
  >

  </SEO>
)