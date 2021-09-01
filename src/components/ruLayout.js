import React from "react"
import { Helmet } from "react-helmet"

import PropTypes from "prop-types"
import { graphql, Link, StaticQuery } from "gatsby"
import FeaturedImage from "../components/featuredImage"
import Banner from "../components/banner"
import NavigationBar from "../components/ruNavigationBar"
import "./layout.css"

const RuLayout = ({ 
  children,
  showLikes,
  languageName,
  anotherLanguageLink,
  title,
  section,
  buttonText,
  buttonLink,
  secondButtonText,
  secondButtonLink,
  featuredImage,
  bannerParagraph }) => (
  <StaticQuery
    query={graphql`
      query RuSiteInfoQuery {
        currentBuildDate {
          currentDate
        }
      }
    `}
    render={data => (
      <>
        <Helmet>
          <title>{title} - Николай Неупокоев</title>

          {/* <!-- HTML Meta Tags --> */}
          <meta name="description" content="Software app ideas, game development blog, tips for embedded engineers, DIY projects with Arduino and other nerdy stuff" />

          {/* <!-- Google / Search Engine Tags --> */}
          <meta itemprop="name" content="Developer, traveler, snob - Nikolay Neupokoev" />
          <meta itemprop="description" content="Software app ideas, game development blog, tips for embedded engineers, DIY projects with Arduino and other nerdy stuff" />
          <meta itemprop="image" content="https://mikolasan.github.io/images/index-7.jpg" />

          {/* <!-- Facebook Meta Tags --> */}
          <meta property="og:url" content="https://mikolasan.github.io" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Developer, traveler, snob - Nikolay Neupokoev" />
          <meta property="og:description" content="Software app ideas, game development blog, tips for embedded engineers, DIY projects with Arduino and other nerdy stuff" />
          <meta property="og:image" content="https://mikolasan.github.io/images/index-7.jpg" />

          {/* <!-- Twitter Meta Tags --> */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Developer, traveler, snob - Nikolay Neupokoev" />
          <meta name="twitter:description" content="Software app ideas, game development blog, tips for embedded engineers, DIY projects with Arduino and other nerdy stuff" />
          <meta name="twitter:image" content="https://mikolasan.github.io/images/index-7.jpg" />

          {/* <!-- Meta Tags Generated via http://heymeta.com --> */}

          <link href="https://fonts.googleapis.com/css2?family=Literata:wght@700&family=Manrope:wght@300&family=Nunito:wght@300&display=swap" rel="stylesheet" />
        </Helmet>
        <header>
          <NavigationBar active={section} />
          {featuredImage
          && (<FeaturedImage imgFluid={featuredImage} />)
          || (
            <Banner
              buttonText={buttonText}
              buttonLink={buttonLink}
              secondButtonText={secondButtonText}
              secondButtonLink={secondButtonLink}
            >
              {bannerParagraph}
            </Banner>
          )}
        </header>
        <main>
          <section>
            {!featuredImage && (
              <div className="mobile-header">{bannerParagraph}</div>
            )}
            {children}
          </section>
          {showLikes && (
            <section>
              <LikesPanel />
            </section>
          )}
        </main>
        <footer>
          <div className="bottomnav">
            <Link style={{marginBottom: '0.5em', textDecoration: 'underline'}} to={anotherLanguageLink}>{languageName}</Link>
            <div className="bottomsmallabout">
              <h2>О себе</h2>
              <p>Нейронные сети, байесовский вывод, разношёрстный девлог, паранормальные экспедиции, настольные игры и ролёвки, пиксель арт</p>
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
