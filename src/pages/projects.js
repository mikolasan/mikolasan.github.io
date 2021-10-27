import React from "react"
import Layout from "../components/layout"

const Projects = ({ pageContext }) => (
  <Layout
    title="Projects"
    section="projects"
    crumbs={pageContext.breadcrumb.crumbs}
    languageName="Switch to russian version"
    anotherLanguageLink="/ru/projects"
    bannerParagraph={[<h1>Projects</h1>]}
  >
    

    <h2>Sub projects</h2>
    <div className="ideacards">
      <div className="ideacard">
        <a href="/make">
          <img src="/images/projects/word-clock.jpg" alt="Acrylic parts" />
        </a>
        <div className="idea-card-container">
          <h3>Make</h3>
          <p>TODO: description is missing</p>
          <p><a href="/projects/word-clock">Read more</a></p>
        </div>
      </div>

      <div className="ideacard">
        <a href="/youtube">
          <img src="/images/projects/youtube.jpg" alt="YouTube channel art" />
        </a>
        <div className="idea-card-container">
          <h3>YouTube channel</h3>
          <p>TODO: description is missing</p>
          <p><a href="/youtube">Read more</a></p>
        </div>
      </div>

      <div className="ideacard">
        <a href="/board-games">
          <img src="/images/projects/board-game.jpg" alt="Prototype playthrough"/>
        </a>
        <div className="idea-card-container">
          <h3>My board game</h3>
          <p>If board games you know do not give you joy anymore, then why not create your own?</p>
          <p><a href="/board-games">Read more</a></p>
        </div>
      </div>

    </div>

    <h2>Software development</h2>
    <div className="ideacards">
      <div className="ideacard">
        <a href="/projects/imperial-russia">
          <img src="/images/projects/imperial-russia.jpg" alt="Russian village" />
        </a>
        <div className="idea-card-container">
          <h3>Imperial Russia</h3>
          <p>Historic unit converter</p>
          <p><a href="/projects/imperial-russia">Read more</a></p>
        </div>
      </div>

      <div className="ideacard">
        <a href="/projects/pet-project-navigator">
          <img src="/images/projects/pet-project-navigator.jpg" alt="UI" />
        </a>
        <div className="idea-card-container">
          <h3>Pet Project Navigator</h3>
          <p>Loaded todo list</p>
          <p><a href="/projects/pet-project-navigator">Read more</a></p>
        </div>
      </div>

      <div className="ideacard">
        <a href="/projects/calm-place">
          <img src="/images/projects/calm-place.jpg" alt="Flight tracker" />
        </a>
        <div className="idea-card-container">
          <h3>Calm place</h3>
          <p>TODO: description is missing</p>
          <p><a href="/projects/calm-place">Read more</a></p>
        </div>
      </div>
    </div>

  </Layout>
)

export default Projects
