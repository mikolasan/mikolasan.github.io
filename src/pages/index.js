import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/indexLayout"

const Index = ({ pageContext }) => (
  <Layout
    title="Developer, traveler, snob"
    section="root"
    crumbs={pageContext.breadcrumb.crumbs}
    languageName="Switch to russian version"
    anotherLanguageLink="/ru"
    buttonText="Projects"
    buttonLink="/projects"
    secondButtonText="Blog"
    secondButtonLink="/blog"
    bannerParagraph={[
      <h1>👋 Hi</h1>,
      <p>I'm Nikolay. Game developer, slot mathematician, DIY engineer 🎲 Creating apps with C++, Python, JavaScript, Kotlin</p>
    ]}
    recentArticles={pageContext.recentArticles}
  >
    
    <h1 className="home_title">Developer</h1>
    <section>
      <div className="home_card">
        <a className="home_card_image" href="/projects/imperial-russia">
          <img src="/images/projects/imperial-russia.jpg" alt="Russian village" />
        </a>
        <div className="home_card_description">
          <h2>Imperial Russia</h2>
          <p>Historic unit converter</p>
          <p><a href="/projects/imperial-russia">Read more</a></p>
        </div>
      </div>

      <div className="home_card">
        <a className="home_card_image" href="/gamedev/overload-godot">
          <img src="/images/projects/overload-godot.jpg" alt="" />
        </a>
        <div className="home_card_description">
          <h2>Overload 2</h2>
          <p> (Godot 3.1)</p>
          <p><a href="/gamedev/overload-godot">Read more</a></p>
        </div>
      </div>

      <div className="home_card">
        <a className="home_card_image" href="/gamedev/pyroguelike">
          <img src="/images/projects/not-your-fathers-roguelike.jpg" alt="Pixel art level"/>
        </a>
        <div className="home_card_description">
          <h2><b>Roguelike</b></h2>
          <p>Not Your Father's Roguelike. (PyGame)</p>
          <p><a href="/gamedev/pyroguelike">Read more</a></p>
        </div>
      </div>

      <div className="home_card">
        <a className="home_card_image" href="/board-games">
          <img src="/images/projects/board-game.jpg" alt="Prototype playthrough"/>
        </a>
        <div className="home_card_description">
          <h2>Board game</h2>
          <p>TODO: description is missing</p>
          <p><a href="/board-games">Read more</a></p>
        </div>
      </div>

      <div className="home_card">
        <a className="home_card_image" href="/youtube">
          <img src="/images/projects/youtube.jpg" alt="YouTube channel art" />
        </a>
        <div className="home_card_description">
          <h2>YouTube channel</h2>
          <p>TODO: description is missing</p>
          <p><a href="/youtube">Read more</a></p>
        </div>
      </div>

    </section>

    <h1 className="home_title">Traveler</h1>
    <section>
      <div className="home_card">
        <a className="home_card_image" href="/projects/imperial-russia">
          <img src="/images/projects/imperial-russia.jpg" alt="Russian village" />
        </a>
        <div className="home_card_description">
          <h2>Imperial Russia</h2>
          <p>Historic unit converter</p>
          <p><a href="/projects/imperial-russia">Read more</a></p>
        </div>
      </div>
    </section>

    <h1 className="home_title">Snob</h1>
    <section>
      <div className="home_card">
        <a className="home_card_image" href="/projects/imperial-russia">
          <img src="/images/projects/imperial-russia.jpg" alt="Russian village" />
        </a>
        <div className="home_card_description">
          <h2>Imperial Russia</h2>
          <p>Historic unit converter</p>
          <p><a href="/projects/imperial-russia">Read more</a></p>
        </div>
      </div>
    </section>
  </Layout>
)

export default Index

