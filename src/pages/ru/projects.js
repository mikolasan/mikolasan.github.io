import React from "react"
import Layout from "../../components/ru/layout"
import { SEO } from "../../components/seo"

const Projects = ({ data }) => (
  <Layout
    title="Проекты"
    section="projects"
    languageName="Switch to english version"
    anotherLanguageLink="/projects"
    bannerParagraph={[<h1>Проекты</h1>]}
  >
    <div className="ideacards">
      <div className="ideacard">
        <a href="/ru/make/hydroponics">
          <img src="/images/projects/hydroponics.jpg" alt="Hydroponics"/>
        </a>
        <div className="idea-card-container">
          <h3>Гидропоника</h3>
          <p>Выращивание еды круглый год в Сибири</p>
        </div>
      </div>

      <div className="ideacard">
        <a href="/ru/board-games">
          <img src="/images/projects/board-game.jpg" alt="Prototype playthrough"/>
        </a>
        <div className="idea-card-container">
          <h3>Настольные игры</h3>
          <p>Создаю свои правила</p>
        </div>
      </div>

      <div className="ideacard">
        <a href="/ru/youtube">
          <img src="/images/projects/youtube.jpg" alt="YouTube channel art" />
        </a>
        <div className="idea-card-container">
          <h3>Ютюб канал</h3>
          <p>Наука - разработка - экперименты</p>
        </div>
      </div>

    </div>
    <h2>Разработка программ</h2>
    <p>Что есть интересного на моем GitHub, я кратко перечислил на <a href="/ru/devlog/github">отдельной странице</a>.</p>
    <div className="ideacards">
      <div className="ideacard">
        <a href="/ru/devlog/imperial-russia">
          <img src="/images/projects/imperial-russia.jpg" alt="Russian village" />
        </a>
        <div className="idea-card-container">
          <h3>Имперскaя Россия</h3>
          <p>Русские старинные меры длины в приложении на Android</p>
        </div>
      </div>

      <div className="ideacard">
        <a href="/ru/devlog/pet-project-navigator">
          <img src="/images/projects/pet-project-navigator.jpg" alt="UI" />
        </a>
        <div className="idea-card-container">
          <h3>Навигатор по хобби проектам</h3>
          <p>Составление списка задач на будущее с необычным интерфейсом</p>
        </div>
      </div>
    </div>

    <h2>Разработка игр</h2>
    <a href="/ru/gamedev">Перейти в раздел</a>
    <div className="ideacards">
      <div className="ideacard">
        <a href="/ru/devlog/pyroguelike">
          <img src="/images/projects/not-your-fathers-roguelike.jpg" alt="Pixel art level"/>
        </a>
        <div className="idea-card-container">
          <h3><b>Хардкорная бродилка</b></h3>
          <p>Рогалик, который ты еще не прошел</p>
        </div>
      </div>

      <div className="ideacard">
        <a href="/ru/devlog/battleship">
          <img src="/images/projects/bato-yo-slaget.jpg" alt="Ship in the acid sea"/>
        </a>
        <div className="idea-card-container">
          <h3>Морской бой</h3>
          <p>Экспериментальный проект: стоит ли использовать чужой код?</p>
        </div>
      </div>

      <div className="ideacard">
        <a href="/ru/devlog/overload-game">
          <img src="/images/projects/overload-cpp.jpg" alt="Synthwave style landscape" />
        </a>
        <div className="idea-card-container">
          <h3>Перегрузка 1</h3>
          <p>И без игровых движков можно жить! (C++)</p>
        </div>
      </div>

      <div className="ideacard">
        <a href="/ru/devlog/sudoku-16x16">
          <img src="/images/projects/sudoku.jpg" alt="Game screen" />
        </a>
        <div className="idea-card-container">
          <h3>Судоку 16x16</h3>
          <p>Умещаем большие судоку на экран мобильных телефонов (Godot 3.1)</p>
        </div>
      </div>
    </div>
  </Layout>
)

export default Projects

export const Head = ({ location, data, pageContext }) => (
  <SEO 
    path={location.pathname}
    data={data}
    frontmatter={data?.markdownRemark?.frontmatter}
    pageContext={pageContext}
    title="Проекты"
  >

  </SEO>
)