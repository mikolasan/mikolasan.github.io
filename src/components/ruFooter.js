import React from "react"
import { graphql, Link, StaticQuery } from "gatsby"
import { formatDate } from "../nifty"

const RuFooter = () => (
  <StaticQuery
    query={graphql`
      query RuSiteInfoQuery {
        currentBuildDate {
          currentDate
        }
      }
    `}
    render={data => (
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
              <a href="https://twitter.com/stakanmartini">Твиттер</a>
              <a href="https://www.youtube.com/user/stakanmartini">Ютюб</a>
              <a href="https://github.com/mikolasan">Гитхаб</a>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>Сайт работает на генераторе статических сайтов {` `}<a href="https://www.gatsbyjs.org">Gatsby</a>. Последняя сборка: {formatDate(data.currentBuildDate.currentDate, 'ru')}</p>
          <p>Иконки нарисованы художниками, и все необходимые <a href="/credits">кредиты</a>❤️ возданы</p>
          <p>There is also an <a href="/">English version</a> of this website</p>
          <p>© Николай Неупокоев, {new Date().getFullYear()}</p>
        </div>
      </footer>
    )}
  />
)

export default RuFooter