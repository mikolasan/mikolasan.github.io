import React from "react"
import Layout from "../components/layout"

const Projects = ({ pageContext }) => (
  <Layout
    title="Gamedev"
    section="gamedev"
    crumbs={pageContext.breadcrumb.crumbs}
    languageName="Switch to russian version"
    anotherLanguageLink="/ru/projects"
    bannerParagraph={[<h1>Gamedev</h1>]}
  >
    
    <h2>Game development</h2>
    <div className="ideacards">
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
        <a href="/gamedev/battleship">
          <img src="/images/projects/bato-yo-slaget.jpg" alt="Ship in the acid sea"/>
        </a>
        <div className="idea-card-container">
          <h3>Battleship</h3>
          <p> (Python)</p>
          <p><a href="/gamedev/battleship">Read more</a></p>
        </div>
      </div>

      <div className="ideacard">
        <a href="/gamedev/overload-game">
          <img src="/images/projects/overload-cpp.jpg" alt="Synthwave style landscape" />
        </a>
        <div className="idea-card-container">
          <h3>Overload 1</h3>
          <p><em>C++ version</em></p>
          <p>I believe Astatix came out with this idea first. On their website http://www.astatix.com/overload.php one can find the original game rules as I remember it.</p>
          <p>I am currently working on YouTube videos while developing.</p>
          <p><a href="/gamedev/overload-game">Read more</a></p>
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
        <a href="/gamedev/sudoku-16x16">
          <img src="/images/projects/sudoku.jpg" alt="Game screen" />
        </a>
        <div className="idea-card-container">
          <h3>Sudoku 16x16</h3>
          <p> (Godot 3.1)</p>
          <p><a href="/gamedev/sudoku-16x16">Read more</a></p>
        </div>
      </div>

      <h2>Game Jams</h2>

      <p>
        Game jams I have <a href="/gamedev/game-jams">participated in</a>
      </p>

      <h2>Resources</h2>

      <ul>
        <li>My <a href="/gamedev/blogs-channels-links">curated list</a> of gamedev blogs, channels, links etc</li>
        <li>FREE <a href="/free/where-free-art">art</a> <a href="/free/where-free-music">music</a></li>
        <li>Procedural generation with <a href="/gamedev/houdini">Houdini</a></li>
      </ul>
    </div>
  </Layout>
)

export default Projects
