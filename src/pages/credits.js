import React from "react"
import Layout from "../components/layout"

const Credits = ({ pageContext }) => (
  <Layout
    title="Credits"
    section="about"
    crumbs={pageContext.breadcrumb.crumbs}
    bannerParagraph={[
      <h1>Credits</h1>,
      <p>
      Every movie has credits. Every website uses pitures. Because I suck at drawing, I use freebie resources. And I don't mind to give attribute to their authors. 
      </p>
    ]}
  >
    <p>
    <div>Icons made by <a href="https://www.flaticon.com/free-icon/programmer_2092430" title="srip">srip</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></div>
    <div>Icons made by <a href="https://www.flaticon.com/free-icon/car_2706107" title="iconixar">iconixar</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></div>
    <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></div>
    <a href="https://www.flaticon.com/free-icons/global" title="global icons">Global icons created by Freepik - Flaticon</a>
    <a href="https://www.flaticon.com/free-icons/system-update" title="system update icons">System update icons created by Freepik - Flaticon</a>
    <a href="https://www.flaticon.com/free-icons/pagoda" title="pagoda icons">Pagoda icons created by Pause08 - Flaticon</a>
    </p>

  </Layout>
)


export default Credits