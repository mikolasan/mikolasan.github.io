import React from "react"
import PropTypes from "prop-types"
import { graphql, Link, StaticQuery } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header title={data.site.siteMetadata.title}/>
        <div>
          <main>{children}</main>
          <footer>
            <div class="bottomnav">
              <div class="bottomsmallabout">
                <h2>About</h2>
                <p>I am a future artist. I spend a lot of time with C++, but there is not much of intelligible. So I will become an artist, I promise. #sarcasm</p>
              </div>
              <div class="bottommenu">
                <h2>Menu</h2>
                <Link to="/everything/">Everything</Link>
                <Link to="/science/">Science</Link>
                <Link to="/projects/">Projects</Link>
                <Link to="/gamedev/">Gamedev</Link>
                <Link to="/about/">About</Link>
              </div>
              <div class="bottomxsocial">
                <h2>Social</h2>
                <a href="https://github.com/mikolasan">GitHub</a>
                <a href="https://www.linkedin.com/in/nikolay-neupokoev-29150065/">LinkedIn</a>
                <a href="https://twitter.com/stakanmartini">Twitter</a>
                <a href="https://www.pinterest.com/nenikolay/">Pinterest</a>
              </div>
            </div>
            <div class="copyright">
              © {new Date().getFullYear()}, Built with
              {` `}
              <a href="https://www.gatsbyjs.org">Gatsby</a>
            </div>
          </footer>
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
