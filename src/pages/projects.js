import React from "react"
import Layout from "../components/layout"
import Banner from "../components/banner"

const Projects = ({ data }) => (
  <Layout languageName="Switch to russian version" anotherLanguageLink="/ru/projects">
    <Banner>
      <h1>Projects</h1>
    </Banner>
    <section>
      <h2>Software development</h2>
      <div class="ideacards">
        <div class="ideacard">
          <a href="/projects/imperial-russia">
            <img src="/images/projects/imperial-russia.jpg" alt="Russian village" />
          </a>
          <div class="card-container">
            <h3>Imperial Russia</h3>
            <p>Historic unit converter</p>
          </div>
        </div>

        <div class="ideacard">
          <a href="/projects/pet-project-navigator">
            <img src="/images/projects/pet-project-navigator.jpg" alt="UI" />
          </a>
          <div class="card-container">
            <h3>Pet Project Navigator</h3>
            <p>Loaded todo list</p>
          </div>
        </div>

        <div class="ideacard">
          <a href="/projects/calm-place">
            <img src="/images/projects/calm-place.jpg" alt="Flight tracker" />
          </a>
          <div class="card-container">
            <h3>Calm place</h3>
            <p>TODO: description is missing</p>
          </div>
        </div>
      </div>

      <h2>Game development</h2>
      <div class="ideacards">
        <div class="ideacard">
          <a href="/gamedev/pyroguelike">
            <img src="/images/projects/not-your-fathers-roguelike.jpg" alt="Pixel art level"/>
          </a>
          <div class="card-container">
            <h3><b>Roguelike</b></h3>
            <p>Not Your Father's Roguelike. (PyGame)</p>
          </div>
        </div>

        <div class="ideacard">
          <a href="/gamedev/battleship">
            <img src="/images/projects/bato-yo-slaget.jpg" alt="Ship in the acid sea"/>
          </a>
          <div class="card-container">
            <h3>Battleship</h3>
            <p> (Python)</p>
          </div>
        </div>

        <div class="ideacard">
          <a href="/gamedev/overload-game">
            <img src="/images/projects/overload-cpp.jpg" alt="Synthwave style landscape" />
          </a>
          <div class="card-container">
            <h3>Overload 1</h3>
            <p> (C++)</p>
          </div>
        </div>

        <div class="ideacard">
          <a href="/gamedev/overload-godot">
            <img src="/images/projects/overload-godot.jpg" alt="" />
          </a>
          <div class="card-container">
            <h3>Overload 2</h3>
            <p> (Godot 3.1)</p>
          </div>
        </div>

        <div class="ideacard">
          <a href="/gamedev/sudoku-16x16">
            <img src="/images/projects/sudoku.jpg" alt="Game screen" />
          </a>
          <div class="card-container">
            <h3>Sudoku 16x16</h3>
            <p> (Godot 3.1)</p>
          </div>
        </div>
      </div>

      <h2>Other aspects of life</h2>
      <div class="ideacards">
        <div class="ideacard">
          <a href="/board-games">
            <img src="/images/projects/board-game.jpg" alt="Prototype playthrough"/>
          </a>
          <div class="card-container">
            <h3>Board game</h3>
            <p>TODO: description is missing</p>
          </div>
        </div>

        <div class="ideacard">
          <a href="/science/book">
            <img src="/images/projects/science-book.jpg" alt="Scientific chart of unknown nature"/>
          </a>
          <div class="card-container">
            <h3>Science book</h3>
            <p>TODO: description is missing</p>
          </div>
        </div>

        <div class="ideacard">
          <a href="/youtube">
            <img src="/images/projects/youtube.jpg" alt="YouTube channel art" />
          </a>
          <div class="card-container">
            <h3>YouTube channel</h3>
            <p>TODO: description is missing</p>
          </div>
        </div>

        <div class="ideacard">
          <a href="/projects/word-clock">
            <img src="/images/projects/word-clock.jpg" alt="Acrylic parts" />
          </a>
          <div class="card-container">
            <h3>Word clock</h3>
            <p>TODO: description is missing</p>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default Projects
