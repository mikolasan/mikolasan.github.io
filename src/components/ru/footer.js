import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import { formatDate } from "../../nifty"

const RuFooter = () => {
  const data = useStaticQuery(graphql`
    query SiteInfoQuery {
      currentBuildDate {
        currentDate
      }
    }
  `)
  return (
    <footer>
      <div className="bottomnav">
        <div className="bottomsmallabout">
          <h2>О себе</h2>
          <p>Нейронные сети, байесовский вывод, разношёрстный девлог, паранормальные экспедиции, настольные игры и ролёвки, пиксель арт</p>
        </div>
        <div className="bottommenu">
          <h2>Разделы</h2>
          <div className="bottomlist">
            <Link to="/ru/ideas">Идеи</Link>
            <Link to="/ru/projects">Проекты</Link>
            <Link to="/ru/neural-networks">Наука</Link>
            <Link to="/ru/blog">Блог</Link>
          </div>
        </div>
        <div className="bottommenu">
          <h2>Ещё</h2>
          <div className="bottomlist">
            <Link to="/ru/terms">Условия</Link>
            <Link to="/ru/privacy">Конфиденциальность</Link>
          </div>
        </div>
        <div className="bottomxsocial">
          <h2>Сети</h2>
          <div className="bottomlist">
            <a href="https://twitter.com/stakanmartini" target="_blank" rel="external nofollow noopener noreferrer">Твиттер</a>
            <a href="https://www.youtube.com/user/stakanmartini" target="_blank" rel="external nofollow noopener noreferrer">Ютюб</a>
            <a href="https://github.com/mikolasan" target="_blank" rel="external nofollow noopener noreferrer">Гитхаб</a>
          </div>
        </div>
      </div>
      <div className="copyright">
        <p>Сайт работает на генераторе статических сайтов {` `}
          <a href="https://www.gatsbyjs.org" 
            target="_blank" rel="external nofollow noopener noreferrer">Gatsby</a>. Последняя сборка: {
            formatDate(data.currentBuildDate.currentDate, 'ru')}
        </p>
        <p>Иконки нарисованы художниками, и все необходимые <Link to="/credits">
          кредиты
        </Link>❤️ возданы</p>
        <p>There is also an <Link to="/">English version</Link> of this website</p>
        <p>© Николай Неупокоев, {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}

export default RuFooter