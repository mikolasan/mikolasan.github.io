import React from "react"
import Layout from "../components/layout"
import Banner from "../components/banner"

const Index = ({ data }) => (
  <Layout
    title="Developer, traveler, snob"
    languageName="Switch to russian version"
    anotherLanguageLink="/ru/projects"
  >
    <Banner
      buttonText="All other projects"
      buttonLink="/projects"
      secondButtonText="Blog"
      secondButtonLink="/blog"
    >
      <h1>Nikolay Neupokoev</h1>
      <p>I am a future artist. I spend a lot of time with C++, but there is not much of intelligible. So I will become an artist, I promise.</p>
    </Banner>
    <section>
      <h2>Featured projects</h2>
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
          <a href="/gamedev/overload-godot">
            <img src="/images/projects/overload-godot.jpg" alt="" />
          </a>
          <div className="idea-card-container">
            <h3>Overload 2</h3>
            <p> (Godot 3.1)</p>
            <p><a href="/gamedev/overload-godot">Read more</a></p>
          </div>
        </div>

        <div className="ideacard">
          <a href="/gamedev/pyroguelike">
            <img src="/images/projects/not-your-fathers-roguelike.jpg" alt="Pixel art level"/>
          </a>
          <div className="idea-card-container">
            <h3><b>Roguelike</b></h3>
            <p>Not Your Father's Roguelike. (PyGame)</p>
            <p><a href="/gamedev/pyroguelike">Read more</a></p>
          </div>
        </div>

        <div className="ideacard">
          <a href="/board-games">
            <img src="/images/projects/board-game.jpg" alt="Prototype playthrough"/>
          </a>
          <div className="idea-card-container">
            <h3>Board game</h3>
            <p>TODO: description is missing</p>
            <p><a href="/board-games">Read more</a></p>
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

      </div>
    </section>
  </Layout>
)

export default Index
