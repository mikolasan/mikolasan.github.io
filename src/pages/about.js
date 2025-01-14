import React from "react"
import Layout from "../components/layout"
import { SEO } from "../components/seo"

const About = ({ pageContext }) => {
  const banner = [
    <h1 key="title" id="_name1" itemProp="name">About me</h1>,
  ]
  return (
    <Layout
      title="About me"
      section="about"
      bannerParagraph={banner}
    >

      <h2>👋 Hi</h2>
      <p>Updated from <a href="https://github.com/mikolasan" target="_blank" rel="external nofollow noopener noreferrer">my GitHub profile</a></p>
      <ul>
        <li key="l1">👀 I’m interested in game development, DIY electronics, and artificial intelligence</li>
        <li key="l2">🌱 I’m currently learning Kotlin, revamping data structures and algorithms in GDScript, and basics of electronics</li>
        <li key="l3">💞️ I’m looking to collaborate on projects related to robots, games and procedural generation</li>
        <li key="l4">📫 You can reach me on Mastodon <a href="https://mastodon.social/@mikolasan" target="_blank" rel="external nofollow noopener noreferrer">@mikolasan</a> where once a week I write threads about gamedev and development process</li>
        <li key="l5">☕ Enjoy coding today!</li>
      </ul>

      <div className="cards">
        <div key="c1" className="card">
          <img src="/card_developer.png" alt="Developer" width="100px" />
          <div className="card-container">
            <h3>Developer</h3>
            <p><a href="/cv">My professional resume</a>. Also I have many hobby projects. But ideas—I have more.</p>
          </div>
        </div>

        <div key="c2" className="card">
          <img src="/card_traveler.png" alt="Traveler" width="100px" />
          <div className="card-container">
            <h3>Traveler</h3>
            <p>More than writing code I like to plan a good journey.
              I post travelling stories to <a href="https://www.instagram.com/saturdayscode/" target="_blank" rel="external nofollow noopener noreferrer">my Instagram</a></p>
          </div>
        </div>

        <div key="c3" className="card">
          <img src="/card_snob.png" alt="Snob" width="100px" />
          <div className="card-container">
            <h3>Snob</h3>
            <p>I love good typography. That is why I also write a <a href="https://mikolasan.substack.com/" target="_blank" rel="external nofollow noopener noreferrer">newsletter on Substack</a></p>
          </div>
        </div>

      </div>


      <h2>Brief biography</h2>
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


      <h2>Testimonials</h2>

      <blockquote className="twitter-tweet" data-conversation="none" data-lang="en" data-dnt="true" data-theme="light">
        <p lang="en" dir="ltr">Hahaha that&#39;s exactly the kind of out-of-the-box answer I&#39;m looking for, thanks for your creativity!</p>
        &mdash; Maxime Labonne (@maximelabonne) <a href="https://twitter.com/maximelabonne/status/1548260107732934656?ref_src=twsrc%5Etfw" target="_blank" rel="external nofollow noopener noreferrer">July 16, 2022</a>
      </blockquote> 

      <blockquote className="twitter-tweet" data-conversation="none" data-lang="en" data-dnt="true" data-theme="light">
        <p lang="en" dir="ltr">Gosh and this is what happens when I’m not here for a few hours ?! I love these tech talks so much !!! Hey seriously you two are one of the only reasons I am still on Twitter 😂👑</p>
        &mdash; (Capuc)+i(ne) (@Cappuccino_Math) <a href="https://twitter.com/Cappuccino_Math/status/1548436485832994820?ref_src=twsrc%5Etfw" target="_blank" rel="external nofollow noopener noreferrer">July 16, 2022</a>
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


      <h2>Brain stats</h2>
      <img src="/images/about/brain-wars-stats.png" alt="BrainWars stats" width="400px" />

    </Layout>
  )
}

export default About

export const Head = ({ location, data, pageContext }) => (
  <SEO 
    path={location.pathname}
    data={data}
    frontmatter={data?.markdownRemark?.frontmatter}
    pageContext={pageContext}
    title="About"
  >

  </SEO>
)