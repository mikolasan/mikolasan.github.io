import React from "react"
import Layout from "../components/layout"

const About = ({ pageContext }) => (
  <Layout
    title="Developer, traveler, snob"
    section="about"
    crumbs={pageContext.breadcrumb.crumbs}
    languageName="Switch to russian version"
    anotherLanguageLink="/ru/about"
    buttonText="Open my latest projects"
    buttonLink="/projects"
    secondButtonText="Fresh posts in the blog"
    secondButtonLink="/blog"
    bannerParagraph={[<h1>developer - traveler - snob</h1>]}
  >

    <ul>
      <li>I’m interested in game development, DIY electronics, and artificial intelligence</li>
      <li>I’m currently learning Kotlin, revamping data structures and algorithms in GDScript, and basics of electronics</li>
      <li>I’m looking to collaborate on projects related to robots, games and procedural generation</li>
      <li>You can reach me on Twitter <a href="https://twitter.com/mikolasan">@mikolasan</a> where once a week I write threads about gamedev and development process</li>
      <li>Enjoy coding today!</li>
    </ul>
    <p>
      > <a href="https://github.com/mikolasan">My github profile</a>
    </p>


    <p>
    Since early days in school I was reading video game magazines, 
    I liked playing pithy RPG and rapid action games, 
    I discussed them with friends and we dreamed about making our own. 
    </p>
    <p>
    Here I am, I have been doing game development for 10 years in the gambling industry.
    It brings mathematical challenges and the warmth of Las Vegas.
    </p>
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

    <h2>Testimonials</h2>

    <blockquote class="twitter-tweet" data-conversation="none" data-lang="en" data-dnt="true" data-theme="light">
      <p lang="en" dir="ltr">Hahaha that&#39;s exactly the kind of out-of-the-box answer I&#39;m looking for, thanks for your creativity!</p>
      &mdash; Maxime Labonne (@maximelabonne) <a href="https://twitter.com/maximelabonne/status/1548260107732934656?ref_src=twsrc%5Etfw">July 16, 2022</a>
    </blockquote> 

    <blockquote class="twitter-tweet" data-conversation="none" data-lang="en" data-dnt="true" data-theme="light">
      <p lang="en" dir="ltr">Gosh and this is what happens when I’m not here for a few hours ?! I love these tech talks so much !!! Hey seriously you two are one of the only reasons I am still on Twitter 😂👑</p>
      &mdash; (Capuc)+i(ne) (@Cappuccino_Math) <a href="https://twitter.com/Cappuccino_Math/status/1548436485832994820?ref_src=twsrc%5Etfw">July 16, 2022</a>
    </blockquote>


    <h2>I Like</h2>
    <p>
      I like my mountain bike. It allows me to consume(appreciate) nature with the speed  that enough to see landscape from different angles and as a still image when you liked some composition.
    </p>
    <p>
      I like board games. First of all they represent an art piece. Then they have a story, setting and specific rules in their world.
    </p>
    <p>
      I like hardware, electronic components, limited resources and capabilities.
    </p>

    <h2>Brain characteristics</h2>
    <img src="/images/about/brain-wars-stats.png" alt="BrainWars stats" width="400px" />

    
    <small>
    <div>Icons made by <a href="https://www.flaticon.com/free-icon/programmer_2092430" title="srip">srip</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></div>
    <div>Icons made by <a href="https://www.flaticon.com/free-icon/car_2706107" title="iconixar">iconixar</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></div>
    <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></div>
    </small>

    
  </Layout>
)

export default About
