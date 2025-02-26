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
          <p>N is a magazine, blog and knowledge base for embedded engineers, 
            game developers and geeks
          </p>
          <a href="https://neupokoev.xyz/rss.xml" target="_blank" rel="external nofollow noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="social-icon rss-color" aria-hidden="true" focusable="false">
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm1.5 2.5c5.523 0 10 4.477 10 10a1 1 0 1 1-2 0 8 8 0 0 0-8-8 1 1 0 0 1 0-2m0 4a6 6 0 0 1 6 6 1 1 0 1 1-2 0 4 4 0 0 0-4-4 1 1 0 0 1 0-2m.5 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
            </svg>
          </a>
        </div>
        <div className="bottommenu">
          <h2>Maker and Scientist</h2>
          <div className="bottomlist">
            <Link to="/robots">Robots</Link>
            <Link to="/make">Make</Link>
            <Link to="/ai">Artificial Intelligence</Link>
            <Link to="/science">Science</Link>
          </div>
        </div>
        <div className="bottommenu">
          <h2>Programmer</h2>
          <div className="bottomlist">
            <Link to="/code/cpp">C++</Link>
            <Link to="/linux">Linux</Link>
            <Link to="/gamedev">Gamedev</Link>
            <Link to="/ideas">Ideas</Link>
          </div>
        </div>
        <div className="bottommenu">
          <h2>Just Posts</h2>
          <div className="bottomlist">
            <Link to="/posts/good">The Good</Link>
            <Link to="/posts/bad">The Bad</Link>
            <Link to="/posts/ugly">The Ugly</Link>
            <Link to="/blog">Blog</Link>
          </div>
        </div>
        <div className="bottomxsocial">
          <h2>More and Contacts</h2>
          <div className="bottomlist">
            <a href="https://mastodon.social/@mikolasan" target="_blank" rel="external nofollow noopener noreferrer me">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="social-icon" aria-hidden="true" focusable="false">
                {/* Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
                <path d="M433 179.1c0-97.2-63.7-125.7-63.7-125.7-62.5-28.7-228.6-28.4-290.5 0 0 0-63.7 28.5-63.7 125.7 0 115.7-6.6 259.4 105.6 289.1 40.5 10.7 75.3 13 103.3 11.4 50.8-2.8 79.3-18.1 79.3-18.1l-1.7-36.9s-36.3 11.4-77.1 10.1c-40.4-1.4-83-4.4-89.6-54a102.5 102.5 0 0 1 -.9-13.9c85.6 20.9 158.7 9.1 178.8 6.7 56.1-6.7 105-41.3 111.2-72.9 9.8-49.8 9-121.5 9-121.5zm-75.1 125.2h-46.6v-114.2c0-49.7-64-51.6-64 6.9v62.5h-46.3V197c0-58.5-64-56.6-64-6.9v114.2H90.2c0-122.1-5.2-147.9 18.4-175 25.9-28.9 79.8-30.8 103.8 6.1l11.6 19.5 11.6-19.5c24.1-37.1 78.1-34.8 103.8-6.1 23.7 27.3 18.4 53 18.4 175z"/>
              </svg>
            </a>
            
            <a href="https://codeberg.org/mikolasan" target="_blank" rel="external nofollow noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="social-icon" aria-hidden="true" focusable="false">
                {/* Clean HTML SVG icon by jakeg https://codeberg.org/jakeg - https://codeberg.org/Codeberg/Community/issues/976 */}
                <path fill="currentColor" d="M12 1A11 11 0 0 0 1 12a11 11 0 0 0 1.7 6.4L12 6l9.3 12.4A11 11 0 0 0 23 12 11 11 0 0 0 12 1Z"/>
                <path fill="#555" d="M21.3 18.4 12 6l4.4 16.8a11 11 0 0 0 4.9-4.4Z" />
              </svg>
            </a>
            <a href="https://github.com/mikolasan" target="_blank" rel="external nofollow noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" fill="currentColor" className="social-icon" aria-hidden="true" focusable="false">
                {/* Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
                <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
              </svg>
            </a>

            <a href="https://mikolasan.substack.com" target="_blank" rel="external nofollow noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="social-icon" aria-hidden="true" focusable="false"
                style={{height: "1.6em", verticalAlign: "-0.7em"}}>
                <path d="M15 3.604H1v1.891h14v-1.89ZM1 7.208V16l7-3.926L15 16V7.208zM15 0H1v1.89h14z"/>
              </svg>
            </a>
            
            <a href="mailto:contact@neupokoev.xyz" target="_blank" rel="external nofollow noopener noreferrer me">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="social-icon" aria-hidden="true" focusable="false">
                {/* Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. */}
                <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
              </svg>
            </a>
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
        <p className="license_right">Copyright © {new Date().getFullYear()} <a href="/about">Nikolay Neupokoev</a></p>
      </div>
    </footer>
  )
}

export default Footer
