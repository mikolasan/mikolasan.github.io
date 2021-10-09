import React from "react"
import Layout from "../../components/ruLayout"

const RuBoardGames = ({ pageContext }) => (
  <Layout
    title="Настолки"
    section="board-games"
    crumbs={pageContext.breadcrumb.crumbs}
    languageName="Switch to english version"
    anotherLanguageLink="/"
    bannerParagraph={[
      <h1>Настольные игры и ролёвки</h1>,
      <p>Так же как книги, фильмы и музыка, игры позоволяют погрузиться в совершенно иной вымышленный мир,
        живущий по своим правилам. Прелесть игровых механик, поиск новых стратегий - это все невероятно интересно,
        но еще интереснее может оказаться создание своей игры
      </p>
    ]}
  >
    <ul>
      <li><a href="/ru/board-games/cluedo-update">Что не так с игрой Клюедо?</a></li>
      <li><a href="/ru/board-games/legend-of-the-five-rings">Легенда пяти колец (ролевая игра)</a></li>
      <li><a href="/ru/board-games/my-game">Моя игра</a></li>
    </ul>
  </Layout>
)

export default RuBoardGames
