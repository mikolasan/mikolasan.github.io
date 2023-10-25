import React from "react"
import Layout from "../components/layout"

const Slots = ({ pageContext }) => (
  <Layout
    title="Slots"
    section="slots"
    crumbs={pageContext.breadcrumb.crumbs}
  >
       
    <h2>Board game development</h2>
    <ul>
      <li>Section <a href="/board-games">Board games</a></li>
      <li></li>
      <li></li>
    </ul>
    
    <h2>Cool feature prototypes</h2>
    <div className="ideacards">
      <div className="ideacard">
        <a href="/gamedev/fire">
          <img src="/images/projects/fire.jpg" alt="Pink Cadillac"/>
        </a>
        <div className="idea-card-container">
          <h3><b>Tech Stack Smack</b></h3>
          <p></p>
          <p><a href="/slots/tech-stack-smack">Try the slot</a></p>
        </div>
      </div>

      <div className="ideacard">
        <a href="/gamedev/fire">
          <img src="/images/projects/fire.jpg" alt="Pink Cadillac"/>
        </a>
        <div className="idea-card-container">
          <h3><b>The Last Samurai</b></h3>
          <p></p>
          <p><a href="/slots/the-last-samurai">Try the slot</a></p>
        </div>
      </div>
    </div>

    <h2>Game Jams</h2>

    <p>
      Game jams I have <a href="/gamedev/game-jams">participated in</a>
    </p>

    <h2>Cool game names</h2>

    <p>
      While I&apos;m thinking on a title name for one project, I believe some catchy versions can go to a trash bin, 
      but they can shine in another game. Here&apos;s my trash:
    </p>
    <ul>
      <li>Turtle Empire</li>
      <li></li>
      <li></li>
    </ul>
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