import React from "react"
import Layout from "../../components/layout"
import { init_interface } from "../../components/slots/interface"
import { init_reels } from "../../components/slots/new-reels"
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
        crumbs={this.props.pageContext.breadcrumb.crumbs}
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
        
        <div className={styles.generator}>
          <canvas className={styles.slotmachine} id="reels"></canvas>
          <canvas className={styles.slotmachine} id="ui"></canvas>
        </div>
      </Layout>
    )
  }
}

export default TheLastSamurai

export { Head } from "../../components/head"