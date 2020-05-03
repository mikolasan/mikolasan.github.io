import React from "react"
import Layout from "../components/layout"
import FeaturedImage from "../components/featuredImage"

export default ({ data }) => (
  <Layout languageName="Switch to russian version" anotherLanguageLink="/ru">
    <FeaturedImage />
    <section>
      <br />
      <h1>Here it comes</h1>
<p>
Do you want an idea for your new project?
</p>

<p>
I see how you feel. You came here bored with new trending technologies.
They announce new framework every day. They release new programming language every Thursday.
You want to try it all. Understand it very well and be the voice of StackOverflow answers not just a regular reader.
</p>

<p>
So you want to make a great application. It is easy.
</p>

<p>
Here it is. Every night you spend few hours before going to bed. 
And depending how lucky you are, you may finish your project and do not become mad.
</p>

<p>Checkout section <a href="/projects">"Projects"</a> in the search for new ideas.</p>

    </section>
  </Layout>
)
