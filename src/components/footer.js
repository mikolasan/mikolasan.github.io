import React from "react"
import { graphql, Link, StaticQuery } from "gatsby"
import { formatDate } from "../nifty"

const Footer = () => (
  <StaticQuery
    query={graphql`
      query SiteInfoQuery {
        currentBuildDate {
          currentDate
        }
      }
    `}
    render={data => (
      <footer>
        <div className="bottomnav">
          <div className="bottomsmallabout">
            <h2>About</h2>
            <p>N is a magazine, blog and knowledge base for embedded engineers, game developers and geeks</p>
          </div>
          <div className="bottommenu">
            <h2>Topics</h2>
            <div className="bottomlist">
              <Link to="/make">Make</Link>
              <Link to="/science">Science</Link>
              <Link to="/code">Coding</Link>
              <Link to="/gamedev">Gamedev</Link>
              <Link to="/ideas">Ideas</Link>
              <Link to="/blog">Blog</Link>
            </div>
          </div>
          <div className="bottommenu">
            <h2>More</h2>
            <div className="bottomlist">
              <Link to="/devlog">Dev Log</Link>
              <Link to="/slots">Slots</Link>
              <Link to="/projects">Projects</Link>
              <Link to="/youtube">Vlog</Link>
              <Link to="/board-games">Board Games</Link>
              <Link to="/free">Free Stuff</Link>
              <Link to="/ebooks">My ebooks</Link>
            </div>
          </div>
          <div className="bottomxsocial">
            <h2>Social</h2>
            <div className="bottomlist">
              <a href="https://discord.gg/FhbAshWjcB">Discord</a>
              <a href="https://github.com/mikolasan">GitHub</a>
              <a href="https://www.instagram.com/saturdayscode/">Instagram</a>
              <a href="https://www.linkedin.com/in/nikolay-neupokoev">LinkedIn</a>
              <a href="https://www.youtube.com/channel/UC7JDwFPt-Wu_rMB4-g-ePug">YouTube</a>
              <a href="https://twitter.com/mikolasan">Twitter</a>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>This web site uses Google Analytics. It collects and processes data. 
            <a href="https://policies.google.com/technologies/partner-sites">How Google uses information from sites</a>
          </p>
          <p>Icons used on this website require attribution, you can find it on <a href="/credits">credits</a>❤️ page</p>
          <p>Built with{` `}<a href="https://www.gatsbyjs.org">Gatsby</a>. Last build: {formatDate(data.currentBuildDate.currentDate)}</p>
          <p>There is also a <a href="/ru">Russian version</a> of this website</p>
          <div className="license">
            <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
              <img alt="Creative Commons License" src="/cc.svg" />
            </a>{` `}
            <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
              <img alt="Creative Commons License" src="/by.svg" />
            </a>
          </div>
          <p className="license_right">Copyright © {new Date().getFullYear()} Nikolay Neupokoev.</p>
          <p className="license_right">
            Except where otherwise noted, content on this site is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
              Creative Commons Attribution 4.0 International License</a>
          </p>
        </div>
      </footer>
    )}
  />
)

export default Footer