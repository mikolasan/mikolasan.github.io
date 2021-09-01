import React from "react"
import { Helmet } from "react-helmet"

import PropTypes from "prop-types"
import { graphql, Link, StaticQuery } from "gatsby"
import FeaturedImage from "../components/featuredImage"
import Banner from "../components/banner"
import NavigationBar from "../components/navigationBar"
import LikesPanel from "../components/likesPanel"
import "./layout.css"

const Layout = ({ 
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
      query SiteInfoQuery {
        currentBuildDate {
          currentDate
        }
      }
    `}
    render={data => (
      <>
        <Helmet>
          <title>{title} - Nikolay Neupokoev</title>
          
          {/* <!-- HTML Meta Tags --> */}
          <meta name="description" content="Software app ideas, game development blog, tips for embedded engineers, DIY projects with Arduino and other nerdy stuff" />

          {/* <!-- Google / Search Engine Tags --> */}
          <meta itemprop="name" content="Developer, traveler, snob - Nikolay Neupokoev" />
          <meta itemprop="description" content="Software app ideas, game development blog, tips for embedded engineers, DIY projects with Arduino and other nerdy stuff" />
          <meta itemprop="image" content="https://mikolasan.github.io/static/910e5c5134a0c3d81c9491d0b6e82b37/d9713/index-7.jpg" />

          {/* <!-- Facebook Meta Tags --> */}
          <meta property="og:url" content="https://mikolasan.github.io" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Developer, traveler, snob - Nikolay Neupokoev" />
          <meta property="og:description" content="Software app ideas, game development blog, tips for embedded engineers, DIY projects with Arduino and other nerdy stuff" />
          <meta property="og:image" content="https://mikolasan.github.io/static/910e5c5134a0c3d81c9491d0b6e82b37/d9713/index-7.jpg" />

          {/* <!-- Twitter Meta Tags --> */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Developer, traveler, snob - Nikolay Neupokoev" />
          <meta name="twitter:description" content="Software app ideas, game development blog, tips for embedded engineers, DIY projects with Arduino and other nerdy stuff" />
          <meta name="twitter:image" content="https://mikolasan.github.io/static/910e5c5134a0c3d81c9491d0b6e82b37/d9713/index-7.jpg" />

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
              <div className="mobile-header">
                {bannerParagraph}
                {(buttonText && buttonLink) && (
                  <div className="featured-action">
                    <a href={buttonLink}>
                      <button className="action-button">{buttonText}</button>
                    </a>
                  </div>
                ) || ''}
                {(secondButtonText && secondButtonLink) && (
                  <div className="featured-second-action">
                    <a href={secondButtonLink}>
                      <button className="second-action-button">{secondButtonText}</button>
                    </a>
                  </div>
                ) || ''}
              </div>
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
            {anotherLanguageLink && (<Link style={{marginBottom: '0.5em', textDecoration: 'underline'}} to={anotherLanguageLink}>{languageName}</Link>)}
            <div className="bottomsmallabout">
              <h2>About</h2>
              <p>Game developer 🎮|🎰 C++, Python, and JavaScript adventurer. Magistrate in L5R 🎲</p>
            </div>
            <div className="bottommenu">
              <h2>Menu</h2>
              <Link to="/ideas/">Ideas</Link>
              <Link to="/projects/">Projects</Link>
              <Link to="/science/">Science</Link>
              <Link to="/blog/">Blog</Link>
              <Link to="/cv/">CV</Link>
            </div>
            <div className="bottomxsocial">
              <h2>Social</h2>
              <a href="https://twitter.com/mikolasan">Twitter</a>
              <a href="https://www.youtube.com/channel/UC7JDwFPt-Wu_rMB4-g-ePug">YouTube</a>
              <a href="https://github.com/mikolasan">GitHub</a>
              <a href="https://www.instagram.com/saturdayscode/">Instagram</a>
              <a href="https://www.linkedin.com/in/nikolay-neupokoev-29150065/">LinkedIn</a>
            </div>
          </div>
          <div className="copyright">
            <p>This web site uses Google Analytics. It collects and processes data. <a href="https://policies.google.com/technologies/partner-sites">How Google uses information from sites</a></p>
            <p>Built with{` `}<a href="https://www.gatsbyjs.org">Gatsby</a>. Last build: {
            new Date(Date.parse(data.currentBuildDate.currentDate)).toLocaleDateString("en-US", {dateStyle:"full"})
            }</p>
            <p>Copyright © {new Date().getFullYear()} Nikolay Neupokoev. Some rights reserved.</p>
          </div>
        </footer>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
