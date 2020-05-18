import React from "react"
import Layout from "../components/layout"
import FeaturedImage from "../components/featuredImage"

export default ({ data }) => (
  <Layout languageName="Switch to russian version" anotherLanguageLink="/ru">
    <div class="container">
      <FeaturedImage />
      <div class="container-text">
        <div class="featured-area">
          <div class="featured-text">
            <h1>Ideas for new projects?</h1>

            <p>
            So you want to make a great application. It is easy. Do you want an idea for your new project?
            </p>

          </div>
          <div class="featured-action">
            <a href="/ideas/">
            <button class="action-button">Go to Ideas</button>
            </a>
          </div>
        </div>
      </div>
    </div>
    <section>
<br/>
    <p>
I see how you feel. You came here bored with new trending technologies.
They announce new framework every day. They release new programming language every Thursday <sup>[citation needed]</sup>.
You want to try it all. You want to understand it very well and be the voice of StackOverflow answers, not just a regular reader.
</p>

<p>
So you want to make a great application. It is easy. 
</p>

    <div class="cards">
      <div class="card">
        <img src="card_idea.png" alt="Idea"/>
        <div class="card-container">
          <h3><b>Idea</b></h3>
          <p>Get an idea here. This is the first step and it is very important.</p>
        </div>
      </div>

      <div class="card">
        <img src="card_code.png" alt="Code"/>
        <div class="card-container">
          <h3><b>Code</b></h3>
          <p>Find source code that fits to your idea. Any language. Any license.</p>
        </div>
      </div>

      <div class="card">
        <img src="card_art.png" alt="Art" />
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
    </section>
  </Layout>
)
