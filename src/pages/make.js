import React from "react"
import Layout from "../components/layout"

const Make = ({ pageContext }) => (
  <Layout
    title="Make"
    section="projects"
    crumbs={pageContext.breadcrumb.crumbs}
    languageName="Switch to russian version"
    anotherLanguageLink="/ru/make"
    bannerParagraph={[<h1>Make</h1>]}
  >
    <h2>What did I make recently</h2>
    <div className="ideacards">
      <div className="ideacard">
        <a href="/make/hydroponics">
          <img src="/images/projects/hydroponics.jpg" alt="Hydroponics" />
        </a>
        <div className="idea-card-container">
          <h3>Hydroponics</h3>
          <p>TODO: description is missing</p>
          <p><a href="/make/hydroponics">Read more</a></p>
        </div>
      </div>

      <div className="ideacard">
        <a href="/make/word-clock">
          <img src="/images/projects/word-clock.jpg" alt="YouTube channel art" />
        </a>
        <div className="idea-card-container">
          <h3>Word Clock</h3>
          <p>TODO: description is missing</p>
          <p><a href="/make/word-clock">Read more</a></p>
        </div>
      </div>

      <div className="ideacard">
        <a href="/make/oled-button">
          <img src="/images/projects/oled-button.jpg" alt="YouTube channel art" />
        </a>
        <div className="idea-card-container">
          <h3>OLED Button</h3>
          <p>TODO: description is missing</p>
          <p><a href="/make/oled-button">Read more</a></p>
        </div>
      </div>
    </div>


    <h2>Plans</h2>
    <div className="ideacards">
      <div className="ideacard">
        <a href="/make/robot-arm">
          <img src="/images/projects/robot-arm.jpg" alt="Hydroponics" />
        </a>
        <div className="idea-card-container">
          <h3>5 servo robot</h3>
          <p>TODO: description is missing</p>
          <p><a href="/make/robot-arm">Read more</a></p>
        </div>
      </div>

      <div className="ideacard">
        <a href="/make/drum-machine">
          <img src="/images/projects/drum-machine.jpg" alt="Drum machine components" />
        </a>
        <div className="idea-card-container">
          <h3>Drum Machine</h3>
          <p>TODO: description is missing</p>
          <p><a href="/make/drum-machine">Read more</a></p>
        </div>
      </div>
    </div>


    <h2>Links</h2>
    <a href="/make/free-circuit-drawing-software">Free circuit drawing software</a>
  </Layout>
)

export default Make
