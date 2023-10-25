import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import { formatDate } from "../nifty"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query SiteInfoQuery {
      currentBuildDate {
        currentDate
      }
    }
  `)
  return (
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
            <a href="https://discord.gg/FhbAshWjcB" target="_blank" rel="external nofollow noopener noreferrer">Discord</a>
            <a href="https://mikolasan.substack.com" target="_blank" rel="external nofollow noopener noreferrer">Substack</a>
            <a href="https://github.com/mikolasan" target="_blank" rel="external nofollow noopener noreferrer">GitHub</a>
            <a href="https://twitter.com/mikolasan" target="_blank" rel="external nofollow noopener noreferrer">Twitter</a>
            {/* <a href="https://www.linkedin.com/in/nikolay-neupokoev" target="_blank" rel="external nofollow noopener noreferrer">LinkedIn</a> */}
            <a href="https://mastodon.social/@mikolasan" target="_blank" rel="external nofollow noopener noreferrer me">Mastodon</a>
            <a href="https://www.instagram.com/n_tech_lab/" target="_blank" rel="external nofollow noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>
      <div className="copyright">
        <p>This web site uses Google Analytics. It collects and processes data. <a 
          href="https://policies.google.com/technologies/partner-sites" 
          target="_blank" rel="external nofollow noopener noreferrer">How Google uses information from sites</a>
        </p>
        <p>Icons used on this website require attribution, you can find it on <Link to="/credits">credits</Link>❤️ page</p>
        <p>
          Built with{` `}<a href="https://www.gatsbyjs.org" 
            target="_blank" rel="external nofollow noopener noreferrer">Gatsby</a>. Last build: {
            formatDate(data.currentBuildDate.currentDate)}
        </p>
        <p>There is also a <Link to="/ru">Russian version</Link> of this website</p>
        <div className="license">
          <a target="_blank" rel="external nofollow noopener noreferrer license" 
            href="http://creativecommons.org/licenses/by/4.0/">
            <img alt="Creative Commons License" src="/cc.svg" />
          </a>{` `}
          <a target="_blank" rel="external nofollow noopener noreferrer license" 
            href="http://creativecommons.org/licenses/by/4.0/">
            <img alt="Creative Commons License" src="/by.svg" />
          </a>
        </div>
        <p className="license_right">Copyright © {new Date().getFullYear()} Nikolay Neupokoev</p>
        <p className="license_right">
          Except where otherwise noted, content on this site is licensed under a <a 
            target="_blank" rel="external nofollow noopener noreferrer license" 
            href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
