import React from "react"
import Layout from "../components/layout"
import { SEO } from "../components/seo"

const Posts = ({ pageContext }) => (
  <Layout
    title="Posts"
    section=""
    crumbs={pageContext.breadcrumb.crumbs}
  >
    <div className="ideacards">
      <div className="ideacard">
        <a href="/posts/good">
          <img src="/images/posts/good.jpg" alt=""/>
        </a>
        <div className="idea-card-container">
          <h2>The Good</h2>
          <p></p>
          <p><a href="/posts/good">See the list</a></p>
        </div>
      </div>

      <div className="ideacard">
        <a href="/posts/bad">
          <img src="/images/posts/bad.jpg" alt=""/>
        </a>
        <div className="idea-card-container">
          <h2>The Bad</h2>
          <p></p>
          <p><a href="/posts/bad">See the list</a></p>
        </div>
      </div>

      <div className="ideacard">
        <a href="/posts/ugly">
          <img src="/images/posts/ugly.jpg" alt=""/>
        </a>
        <div className="idea-card-container">
          <h2>The Ugly</h2>
          <p></p>
          <p><a href="/posts/ugly">See the list</a></p>
        </div>
      </div>
    </div>
  </Layout>
)

export default Posts

export const Head = ({ location, data, pageContext }) => (
  <SEO 
    path={location.pathname}
    data={data}
    frontmatter={data?.markdownRemark?.frontmatter}
    pageContext={pageContext}
    title="Posts"
  >

  </SEO>
)