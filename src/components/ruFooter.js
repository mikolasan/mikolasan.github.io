import React from "react"
import { graphql, Link, StaticQuery } from "gatsby"

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
            <h2>Старое Меню</h2>
            <Link to="/ru/ideas">Идеи</Link>
            <Link to="/ru/projects">Проекты</Link>
            <Link to="/ru/science">Наука</Link>
            <Link to="/ru/blog">Блог</Link>
            <Link to="/ru/cv">Резюме</Link>
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
          <p>На этом сайте используется Google Analytics. Она собирает и обрабатывает данные о вас. <a href="https://policies.google.com/technologies/partner-sites">
            Как Google использует информацию, собираемую с сайтов</a>
          </p>
          <p>Сайт работает на генераторе статических сайтов {` `}<a href="https://www.gatsbyjs.org">Gatsby</a>. Последняя сборка: {
          new Date(Date.parse(data.currentBuildDate.currentDate)).toLocaleDateString("ru-RU", {dateStyle:"full"})
          }</p>
          <p>© Николай Неупокоев, {new Date().getFullYear()}</p>
        </div>
      </footer>
    )}
  />
)

export default RuFooter