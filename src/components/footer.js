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
            <Link to="/linux">Linux</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/ideas">Ideas</Link>
            <Link to="/blog">Blog</Link>
          </div>
        </div>
        <div className="bottommenu">
          <h2>Posts</h2>
          <div className="bottomlist">
            <Link to="/posts/good">The Good</Link>
            <Link to="/posts/bad">The Bad</Link>
            <Link to="/posts/ugly">The Ugly</Link>
          </div>
        </div>
        <div className="bottomxsocial">
          <h2>Social</h2>
          <div className="bottomlist">
            <a href="https://mastodon.social/@mikolasan" target="_blank" rel="external nofollow noopener noreferrer me">Mastodon</a>
            <a href="https://discord.gg/FhbAshWjcB" target="_blank" rel="external nofollow noopener noreferrer">Discord</a>
            <a href="https://github.com/mikolasan" target="_blank" rel="external nofollow noopener noreferrer">GitHub</a>
            <a href="https://www.instagram.com/n_tech_lab/" target="_blank" rel="external nofollow noopener noreferrer">Instagram</a>
            <a href="https://mikolasan.substack.com" target="_blank" rel="external nofollow noopener noreferrer">Substack</a>
            <a href="https://twitter.com/mikolasan" target="_blank" rel="external nofollow noopener noreferrer">Twitter</a>
            {/* <a href="https://www.linkedin.com/in/nikolay-neupokoev" target="_blank" rel="external nofollow noopener noreferrer">LinkedIn</a> */}
          </div>
        </div>
      </div>
      <div className="copyright">
        <p>This web site utilizes a privacy-friendly analytics system <a 
          href="https://umami.is/docs/cloud"
          target="_blank" rel="external nofollow noopener noreferrer">Umami</a>
        </p>
        <p>
          Built with{` `}<a href="https://www.gatsbyjs.org" 
            target="_blank" rel="external nofollow noopener noreferrer">Gatsby</a>. Last build: {
            formatDate(data.currentBuildDate.currentDate)}
        </p>
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
        <p className="license_right">
          Except where otherwise noted, content on this site is licensed under a <a 
            target="_blank" rel="external nofollow noopener noreferrer license" 
            href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>
        </p>
        <p className="license_right">Copyright © {new Date().getFullYear()} Nikolay Neupokoev</p>
      </div>
    </footer>
  )
}

export default Footer
