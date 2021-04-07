import React from "react"
import Layout from "../components/layout"
import Banner from "../components/banner"

const Index = ({ data }) => (
  <Layout
    title="Developer, traveler, snob"
    languageName="Switch to russian version"
    anotherLanguageLink="/ru"
  >
    <Banner
      buttonText="Open my latest projects"
      buttonLink="/projects/"
      secondButtonText="Fresh posts in the blog"
      secondButtonLink="/blog/"
    >
      <h1>developer - traveler - snob</h1>
    </Banner>
    <section>
      <p>
      I am a full-time developer, once a year traveler and a snob ever since I registered on Instagram.
      I have a postgraduate degree in Applied Mathematics and Computer <a href="/science">Science</a>. With its help, I do what I do for a living.
      But besides that, I passionate about <a href="/gamedev">game development</a> and irrational exploitation of computers.
      </p>

      <div className="cards">
        <div className="card">
          <img src="/card_developer.png" alt="Developer" width="100px" />
          <div className="card-container">
            <h3>Developer</h3>
            <p>I have many hobby projects. But ideas I have more.</p>
          </div>
        </div>

        <div className="card">
          <img src="/card_traveler.png" alt="Traveler" width="100px" />
          <div className="card-container">
            <h3>Traveler</h3>
            <p>More than writing code I like to plan a good journey.</p>
          </div>
        </div>

        <div className="card">
          <img src="/card_snob.png" alt="Snob" width="100px" />
          <div className="card-container">
            <h3>Snob</h3>
            <p>I enjoy the code that is written well and looks perfect. </p>
          </div>
        </div>

      </div>
      <h2>Navigation</h2>
      <p>Here is <a href="/one-page-navigation/">One Page to rule them all</a></p>
      <hr/>
      <small>
      <div>Icons made by <a href="https://www.flaticon.com/free-icon/programmer_2092430" title="srip">srip</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></div>
      <div>Icons made by <a href="https://www.flaticon.com/free-icon/car_2706107" title="iconixar">iconixar</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></div>
      <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></div>
      </small>
    </section>
  </Layout>
)

export default Index
