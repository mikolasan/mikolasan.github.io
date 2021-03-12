import React from "react"
import { Helmet } from "react-helmet"

import PropTypes from "prop-types"
import { graphql, Link, StaticQuery } from "gatsby"

import NavigationBar from "../components/navigationBar"
import LikesPanel from "../components/likesPanel"
import "./layout.css"

const Layout = ({ children, showLikes, languageName, anotherLanguageLink, title }) => (
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
          <link href="https://fonts.googleapis.com/css2?family=Vollkorn+SC:wght@700&family=Manrope:wght@300&family=Nunito:wght@300&display=swap" rel="stylesheet" />
        </Helmet>
        <header>
          <NavigationBar />
        </header>
        <main>
          {children}
          {showLikes && (
          <section>
            <LikesPanel />
          </section>)}
        </main>
        <footer>
          <div class="bottomnav">
            <Link style={{marginBottom: '0.5em', textDecoration: 'underline'}} to={anotherLanguageLink}>{languageName}</Link>
            <div class="bottomsmallabout">
              <h2>About</h2>
              <p>I am a future artist. I spend a lot of time with C++, but there is not much of intelligible. So I will become an artist, I promise. #irony</p>
            </div>
            <div class="bottommenu">
              <h2>Menu</h2>
              <Link to="/ideas/">Ideas</Link>
              <Link to="/projects/">Projects</Link>
              <Link to="/science/">Science</Link>
              <Link to="/blog/">Blog</Link>
              <Link to="/cv/">CV</Link>
            </div>
            <div class="bottomxsocial">
              <h2>Social</h2>
              <a href="https://github.com/mikolasan">GitHub</a>
              <a href="https://www.linkedin.com/in/nikolay-neupokoev-29150065/">LinkedIn</a>
              <a href="https://www.pinterest.com/nenikolay/">Pinterest</a>
              <a href="https://twitter.com/mikolasan">Twitter</a>
              <a href="https://www.youtube.com/channel/UC7JDwFPt-Wu_rMB4-g-ePug">YouTube</a>
            </div>
          </div>
          <div class="copyright">
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
