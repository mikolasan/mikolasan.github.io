import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

const IdeasPage = ({ pageContext }) => (
  <Layout
    title="Ideas"
    section="ideas"
    crumbs={pageContext.breadcrumb.crumbs}
    languageName="Switch to russian version"
    anotherLanguageLink="/ru/ideas"
    buttonText="Game Ideas"
    buttonLink="/ideas/games/"
    secondButtonText="AI Ideas"
    secondButtonLink="/ideas/ai/"
    bannerParagraph={[
      <h1>Ideas</h1>,
      <p>
      So you want to make a great application? Start here
      </p>
    ]}
  >

    <p>
    Here it is. Every night you spend few hours before going to bed.
    And depending how lucky you are, you may finish your project and do not become mad before your first release.
    </p>

    <h2>By category</h2>

    <ul>
      <li><Link to="/ideas/games/">Games</Link></li>
      <li><Link to="/ideas/ai/">AI</Link></li>
      <li><Link to="/ideas/diy/">DIY</Link></li>
      <li><Link to="/ideas/ar/">Augmented reality</Link></li>
      <li><Link to="/ideas/mobile-app/">Mobile app</Link></li>
      <li><Link to="/ideas/web-app/">Web app</Link></li>
      <li><Link to="/ideas/life/">Life</Link></li>
    </ul>

    <p>Checkout section <a href="/projects">"Projects"</a> to find out my passions.</p>

    <h2>Idea generator</h2>

    <p>
    Are you overwhelmed with new trending technologies?
    </p>
    <p>
    They announce new framework every day. They release new programming language every Thursday <sup>[citation needed]</sup>.
    </p>
    <p>
    You want to try it all. You want to understand it very well and be the voice of StackOverflow answers, not just a regular reader.
    </p>
    <p>
    When it's hard to choose tech stack, use a generator for that.
    </p>

    <p>
      <a href="/idea-generator/">
        <button className="action-button">Try it</button>
      </a>
    </p>

    {/* <div className="cards">
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

    </div> */}

    {/* <div>
      

      
      
      <hr/>
      <small>
      <div>Icons made by <a href="https://www.flaticon.com/authors/wanicon" title="wanicon">wanicon</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
      <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
      </small>

    </div> */}
  </Layout>
)

export default IdeasPage
