import React from "react"
import { Helmet } from "react-helmet"

import PropTypes from "prop-types"
import { graphql, Link, StaticQuery } from "gatsby"

import NavigationBar from "../components/ruNavigationBar"
import "./layout.css"

const RuLayout = ({ children, showLikes, languageName, anotherLanguageLink }) => (
  <StaticQuery
    query={graphql`
      query RuSiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        },
        currentBuildDate {
          currentDate
        }
      }
    `}
    render={data => (
      <>
        <Helmet>
          <title>{data.site.siteMetadata.title}</title>
          <link href="https://fonts.googleapis.com/css2?family=Vollkorn+SC:wght@700&family=Manrope:wght@300&family=Nunito:wght@300&display=swap" rel="stylesheet" />
        </Helmet>
        <header>
          <NavigationBar />
        </header>
        <main>
          {children}
        </main>
        <footer>
          <div className="bottomnav">
            <Link style={{marginBottom: '0.5em', textDecoration: 'underline'}} to={anotherLanguageLink}>{languageName}</Link>
            <div className="bottomsmallabout">
              <h2>О себе</h2>
              <p>Не использую смайлики и эмодзи. Пишу о муках программирования, невостребованных идеях, иногда кидаю чужие ссылки, а иногда свои наблюдения.</p>
            </div>
            <div className="bottommenu">
              <h2>Меню</h2>
              <Link to="/ru/ideas/">Идеи</Link>
              <Link to="/ru/projects/">Проекты</Link>
              <Link to="/ru/science/">Наука</Link>
              <Link to="/ru/blog/">Блог</Link>
              <Link to="/ru/cv/">Резюме</Link>
            </div>
            <div className="bottomxsocial">
              <h2>Сети</h2>
              <a href="https://github.com/mikolasan">GitHub</a>
              <a href="https://www.linkedin.com/in/nikolay-neupokoev-29150065/">LinkedIn</a>
              <a href="https://www.pinterest.com/nenikolay/">Pinterest</a>
              <a href="https://twitter.com/stakanmartini">Twitter</a>
              <a href="https://www.youtube.com/user/stakanmartini">YouTube</a>
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
      </>
    )}
  />
)

RuLayout.propTypes = {
  children: PropTypes.node.isRequired,
  languageName: PropTypes.node.isRequired,
  anotherLanguageLink: PropTypes.node.isRequired,
}

export default RuLayout
