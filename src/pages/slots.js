import React from "react"
import Layout from "../components/layout"
import { SEO } from "../components/seo"

const Slots = ({ pageContext }) => (
  <Layout
    title="Slots"
    section="slots"
    crumbs={pageContext.breadcrumb.crumbs}
  >
    <h2>Cool feature prototypes</h2>
    <div className="ideacards">
      <div className="ideacard">
        <a href="/slots/tech-stack-smack">
          <img src="/images/projects/fire.jpg" alt="Pink Cadillac"/>
        </a>
        <div className="idea-card-container">
          <h3><b>Tech Stack Smack</b></h3>
          <p></p>
          <p><a href="/slots/tech-stack-smack">Try the slot</a></p>
        </div>
      </div>

      <div className="ideacard">
        <a href="/slots/the-last-samurai">
          <img src="/images/slots/samurai/_4921539a-d3d6-4cd1-a050-ed5252567b58.jpeg" alt="chinese lantern on fire"/>
        </a>
        <div className="idea-card-container">
          <h3><b>The Last Samurai</b></h3>
          <p></p>
          <p><a href="/slots/the-last-samurai">Try the slot</a></p>
        </div>
      </div>

      <div className="ideacard">
        <a href="/slots/still-life">
          <img src="/images/slots/van-gogh/_0331afc1-42f9-49c1-9ee7-99b0f6877f10.jpeg" alt="spades suit drawn in Van Gogh style"/>
        </a>
        <div className="idea-card-container">
          <h3><b>Still Life</b></h3>
          <p></p>
          <p><a href="/slots/the-last-samurai">Try the slot</a></p>
        </div>
      </div>
    </div>
  </Layout>
)

export default Slots

export const Head = ({ location, data, pageContext }) => (
  <SEO 
    path={location.pathname}
    data={data}
    frontmatter={data?.markdownRemark?.frontmatter}
    pageContext={pageContext}
    title="Slots"
  >

  </SEO>
)