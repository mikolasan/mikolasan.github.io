import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

const IdeasPage = () => (
  <Layout
    title="Ideas"
    section="ideas"
    languageName="Switch to russian version"
    anotherLanguageLink="/ru/ideas"
    buttonText="Try free Idea Generator"
    buttonLink="/idea-generator/"
    secondButtonText="Creative ideas for app development"
    secondButtonLink="/creative-ideas-for-app-development/"
    bannerParagraph={[
      <h1>Ideas for new projects?</h1>,
      <p>
      So you want to make a great application.
      It is easy. Get an idea here. This is the first step and it is very important.
      </p>
    ]}
  >
    <h2>Ideas for your next application</h2>
    <ul>
      <li><Link to="/creative-ideas-for-app-development/">Creative ideas for app development</Link></li>
      <li><Link to="/innovative-ideas-for-app-development/">Innovative ideas for app development</Link></li>
      <li><Link to="/ideas-for-app-development/">All of the above</Link></li>
      <li>Weird ones:
        <ul>
          <li>Combine together cameras from trashed phones</li>
          <li>Add Google drive support to open source file manager</li>
        </ul>

      </li>
    </ul>

    <p>Checkout section <a href="/projects">"Projects"</a> to find out my passions.</p>
    <h2>Idea generator</h2>

    <p>
      <a href="/idea-generator/">
        <button className="action-button">Try it</button>
      </a>
    </p>

    <p>
    I see how you feel. You came here bored with new trending technologies.
    They announce new framework every day. They release new programming language every Thursday <sup>[citation needed]</sup>.
    You want to try it all. You want to understand it very well and be the voice of StackOverflow answers, not just a regular reader.
    </p>

    <p>
    So you want to make a great application. It is easy. All you need is these three things.
    </p>

    <div className="cards">
      <div className="card">
        <img src="/card_idea.png" alt="Idea" width="100px" />
        <div className="card-container">
          <h3>Idea</h3>
          <p>Get an idea here. This is the first step and it is very important.</p>
        </div>
      </div>

      <div className="card">
        <img src="/card_code.png" alt="Code" width="100px" />
        <div className="card-container">
          <h3>Code</h3>
          <p>Write source code that fits to your idea. Any language. Any license.</p>
        </div>
      </div>

      <div className="card">
        <img src="/card_art.png" alt="Art" width="100px" />
        <div className="card-container">
          <h3>Art</h3>
          <p>Add colors and pictures. Find good art. I have <a href="/ideas/where-free-art">a list</a> where to look for it.</p>
        </div>
      </div>

    </div>

    <div>
      <p>
      Here it is. Every night you spend few hours before going to bed.
      And depending how lucky you are, you may finish your project and do not become mad before your first release.
      </p>

      
      
      <hr/>
      <small>
      <div>Icons made by <a href="https://www.flaticon.com/authors/wanicon" title="wanicon">wanicon</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
      <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
      </small>

    </div>
  </Layout>
)

export default IdeasPage
