import React from "react"
import { graphql, Link, StaticQuery } from "gatsby"
import { formatDate } from "../nifty"

const RuFooter = ({
  languageName,
  languageLink
}) => (
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
          <Link style={{marginBottom: '0.5em', textDecoration: 'underline'}} to={languageLink}>{languageName}</Link>
          <div className="bottomsmallabout">
            <h2>О себе</h2>
            <p>Нейронные сети, байесовский вывод, разношёрстный девлог, паранормальные экспедиции, настольные игры и ролёвки, пиксель арт</p>
          </div>
          <div className="bottommenu">
            <Link to="/ru/ideas">Идеи</Link>
            <Link to="/ru/projects">Проекты</Link>
            <Link to="/ru/science">Наука</Link>
            <Link to="/ru/blog">Блог</Link>
            <Link to="/ru/cv">Резюме</Link>
            <Link to="/ru/terms">Условия</Link>
            <Link to="/ru/privacy">Конфиденциальность</Link>
          </div>
          <div className="bottomxsocial">
            <h2>Сети</h2>
            <a href="https://twitter.com/stakanmartini">Твиттер</a>
            <a href="https://www.youtube.com/user/stakanmartini">Ютюб</a>
            <a href="https://github.com/mikolasan">GitHub</a>
            <a href="https://www.instagram.com/saturdayscode/">Instagram</a>
            <a href="https://www.linkedin.com/in/nikolay-neupokoev-29150065/">LinkedIn</a>
          </div>
        </div>
        <div className="copyright">
          <p>Сайт работает на генераторе статических сайтов {` `}<a href="https://www.gatsbyjs.org">Gatsby</a>. Последняя сборка: {formatDate(data.currentBuildDate.currentDate, 'ru')}</p>
          <p>© Николай Неупокоев, {new Date().getFullYear()}</p>
        </div>
      </footer>
    )}
  />
)

export default RuFooter