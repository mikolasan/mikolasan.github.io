import React from "react"
import Layout from "../../components/layout"
import { SEO } from "../../components/seo"
import { init_interface } from "../../components/slots/interface"
import { init_reels } from "../../components/slots/samurai-reels"
import * as styles from "../../components/slots/index.module.css"

class TheLastSamurai extends React.Component {
  componentDidMount() {
    init_reels();
    init_interface();
  }

  render() {
    return (
      <Layout
        title="The Last Samurai"
        section="slots"
      >
        <p>
          A special symbol populates all reels one by one by crushing them.
          But only when some special symbol lands on tha reel
        </p>
        <p>
          Stacked symbol on the first reel stops in the full length, then a fighter shoots from the right.
          Other reels spin.
          If the same symbol appears on the next reel, the fighter hits the next reel and feel it all.
          Now, he is on the second reel.
        </p>
        
        <div>
          <canvas className={styles.slotmachine} id="reels"></canvas>
          <canvas className={styles.slotmachine} id="ui"></canvas>
          <div id="slot-machine-result"></div>
        </div>
      </Layout>
    )
  }
}

export default TheLastSamurai

export const Head = ({ location, data, pageContext }) => (
  <SEO 
    path={location.pathname}
    data={data}
    frontmatter={data?.markdownRemark?.frontmatter}
    pageContext={pageContext}
    title="The Last Samurai"
  >

  </SEO>
)