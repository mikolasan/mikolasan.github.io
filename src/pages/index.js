import React from "react"
import Layout from "../components/layout"
import Banner from "../components/banner"

export default ({ data }) => (
  <Layout languageName="Switch to russian version" anotherLanguageLink="/ru">
    <Banner 
      buttonText="Developer: my projects" 
      buttonLink="/projects/"
      secondButtonText="Snob: my blog"
      secondButtonLink="/blog/"
    >
      <h1>developer - traveler - snob</h1>
    </Banner>
    <section>
      <p>
      I am a full-time developer, once a year traveler and a snob ever since I registered on Instagram.
      I have a postgraduate degree in Applied Mathematics and Computer Science. With its help, I do what I do for a living.
      But besides that, I passionate about game development and irrational exploitation of computers.
      </p>

      <div class="cards">
        <div class="card">
          <img src="/card_developer.png" alt="Idea"/>
          <div class="card-container">
            <h3><b>Developer</b></h3>
            <p>I believe in self-education as the best way of improving coding skills that is why I have many hobby projects. But ideas I have more.</p>
          </div>
        </div>

        <div class="card">
          <img src="/card_traveler.png" alt="Code"/>
          <div class="card-container">
            <h3><b>Traveler</b></h3>
            <p>More than writing code I like to plan a good journey, opt out to a real world.</p>
          </div>
        </div>

        <div class="card">
          <img src="/card_snob.png" alt="Art" />
          <div class="card-container">
            <h3><b>Snob</b></h3>
            <p>I enjoy the code that is written well and looks perfect. </p>
          </div>
        </div>
        
        
      </div>
      <hr/>
      <small>
      <div>Icons made by <a href="https://www.flaticon.com/free-icon/programmer_2092430" title="srip">srip</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></div>
      <div>Icons made by <a href="https://www.flaticon.com/free-icon/car_2706107" title="iconixar">iconixar</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></div>
      <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></div>
      </small>
    </section>
  </Layout>
)
