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
Do you want an idea for your new project?
</p>

    </div>
    <div class="featured-action">
      <a href="/projects/ideas">
        <button class="action-button">Goto catalogue</button>
      </a>
    </div>
    </div>
    </div>
    </div>
    <section>
      <br />

<p>
I see how you feel. You came here bored with new trending technologies.
They announce new framework every day. They release new programming language every Thursday.
You want to try it all. You want to understand it very well and be the voice of StackOverflow answers, not just a regular reader.
</p>

<p>
So you want to make a great application. It is easy.
</p>

<p>
Here it is. Every night you spend few hours before going to bed. 
And depending how lucky you are, you may finish your project and do not become mad before your first release.
</p>

<p>Checkout section <a href="/projects">"Projects"</a> to satisfy the search for new ideas.</p>

    </section>
  </Layout>
)
