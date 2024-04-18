import React from "react"
import Layout from "../../components/layout"
import { SEO } from "../../components/seo"
import { init_interface } from "../../components/slots/interface"
import { init_reels } from "../../components/slots/vangogh-reels"
import * as styles from "../../components/slots/index.module.css"

class StillLife extends React.Component {
  componentDidMount() {
    init_reels();
    init_interface();
  }

  render() {
    return (
      <Layout
        title="Still Life"
        section="slots"
        crumbs={this.props.pageContext.breadcrumb.crumbs}
      >
        
        
        <div>
          <canvas className={styles.slotmachine} id="reels"></canvas>
          <canvas className={styles.slotmachine} id="ui"></canvas>
          <div id="slot-machine-result"></div>
        </div>
      </Layout>
    )
  }
}

export default StillLife

export const Head = ({ location, data, pageContext }) => (
  <SEO 
    path={location.pathname}
    data={data}
    frontmatter={data?.markdownRemark?.frontmatter}
    pageContext={pageContext}
    title="Still Life"
  >

  </SEO>
)