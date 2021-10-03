import React from "react"

import PropTypes from "prop-types"
import { graphql, Link, StaticQuery } from "gatsby"
import FeaturedImage from "../components/featuredImage"
import Banner from "../components/banner"
import NavigationBar from "../components/navigationBar"
import LikesPanel from "../components/likesPanel"
import Header from "../components/header"
import Title from "../components/title"
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
  bannerParagraph
}) => (
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
        <Title title={title + " - N"} />
        <Header section={section}
          buttonText={buttonText}
          buttonLink={buttonLink}
          secondButtonText={secondButtonText}
          secondButtonLink={secondButtonLink}
          featuredImage={featuredImage}
          bannerParagraph={bannerParagraph}
        />
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
