import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Banner from "../components/banner"

const IdeasPage = () => (
  <Layout>
    <Banner 
      buttonText="Open Lucky Idea Generator"
      buttonLink="/lucky-idea-generator/"
      secondButtonText="List creative ideas"
      secondButtonLink="/creative-ideas/"
    >
      <h1>Ideas for new projects?</h1>
      <p>
      So you want to make a great application. 
      It is easy. Get an idea here. This is the first step and it is very important.
      </p>
    </Banner>
    <section>
      <p>
      I see how you feel. You came here bored with new trending technologies.
      They announce new framework every day. They release new programming language every Thursday <sup>[citation needed]</sup>.
      You want to try it all. You want to understand it very well and be the voice of StackOverflow answers, not just a regular reader.
      </p>

      <p>
      So you want to make a great application. It is easy. All you need is these three things.
      </p>

      <div class="cards">
        <div class="card">
          <img src="/card_idea.png" alt="Idea"/>
          <div class="card-container">
            <h3><b>Idea</b></h3>
            <p>Get an idea here. This is the first step and it is very important.</p>
          </div>
        </div>

        <div class="card">
          <img src="/card_code.png" alt="Code"/>
          <div class="card-container">
            <h3><b>Code</b></h3>
            <p>Find source code that fits to your idea. Any language. Any license.</p>
          </div>
        </div>

        <div class="card">
          <img src="/card_art.png" alt="Art" />
          <div class="card-container">
            <h3><b>Art</b></h3>
            <p>Add colors and pictures. Find good art. I have a list where to look for it.</p>
          </div>
        </div>
        
      </div>

      <div>
        <p>
        Here it is. Every night you spend few hours before going to bed. 
        And depending how lucky you are, you may finish your project and do not become mad before your first release.
        </p>

        <p>Checkout section <a href="/projects">"Projects"</a> to find out my passions.</p>

        <hr/>
        <small>
        <div>Icons made by <a href="https://www.flaticon.com/authors/wanicon" title="wanicon">wanicon</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </small>

      </div>

      <Link to="/lucky-idea-generator/"><h2>Lucky idea generator</h2></Link>
      <Link to="/creative-ideas/"><h2>Creative ideas crafted with love</h2></Link>
      <h2>And other ideas</h2>
      <ul>
      <li>Combine together cameras from trashed phones</li>
      <li>Add Google drive support to open source file manager</li>
      </ul>
    </section>
  </Layout>
)

export default IdeasPage