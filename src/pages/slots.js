import React from "react"
import Layout from "../components/layout"
import { SEO } from "../components/seo"

const Slots = ({ pageContext }) => (
  <Layout
    title="Slots"
    section="code"
  >
    <h2>Mathematical models</h2>
    <p>
      Visual part of the game is not complex as in modern RPG or action games, 
      it is possible to teach a student, and the game will be ready in two months. 
      But slot machines hide many important parts inside: it plays music, it fires the lights, 
      it reports accounting to the house system, 
      it works autonomously and without a chance for a software mistake. 
      On top of this it requires balanced mathematical calculations 
      which are triggered by pure RNG to engage the player and deliver a joy.
    </p>
  
    <p>
      <a href="/cv">My role</a> is to design, implement, and verify mathematical models that bring profit to the casino, 
      and, on another side, high engagement to a random player from a fortunate win.
    </p>

    <h2>Prototypes</h2>
    <p>Note: I must admit that I regret the use of image generative services for making concept images for these prototypes.</p>
    <div className="ideacards">
      <div className="ideacard">
        <a href="/slots/tech-stack-smack">
          <img src="/images/slots/tech-stack/cover.png" alt="Logos of different frameworks and programming languages covering each other"/>
        </a>
        <div className="idea-card-container">
          <h3><b>Tech Stack Smack</b></h3>
          <p></p>
          <p><a href="/slots/tech-stack-smack">Play it</a></p>
        </div>
      </div>

      <div className="ideacard">
        <a href="/slots/the-last-samurai">
          <img src="/images/slots/samurai/cover.jpeg" alt="Chinese lantern on fire"/>
        </a>
        <div className="idea-card-container">
          <h3><b>The Last Samurai</b></h3>
          <p></p>
          <p><a href="/slots/the-last-samurai">Play it</a></p>
        </div>
      </div>

      <div className="ideacard">
        <a href="/slots/still-life">
          <img src="/images/slots/van-gogh/cover.jpeg" alt="spades suit drawn in Van Gogh style"/>
        </a>
        <div className="idea-card-container">
          <h3><b>Still Life</b></h3>
          <p></p>
          <p><a href="/slots/still-life">Play it</a></p>
        </div>
      </div>
    </div>

    <h2>TODO</h2>
    <ul>
      <li>HoneyRush math model.</li>
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