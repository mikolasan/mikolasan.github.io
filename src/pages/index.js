import React from "react"
import Layout from "../components/indexLayout"

const Index = ({ pageContext }) => (
  <Layout
    title="Developer, traveler, snob"
    section="root"
    languageName="Switch to russian version"
    anotherLanguageLink="/ru"
    recentArticles={pageContext.recentArticles}
  >
    {/* <p className="home_title">Tweet Dayly</p> */}
    <div className="home_grid">
      <section className="home_grid_box1">
        <a className="home_card_image" href="/creative-ideas-for-app-development/">
          <img src="/images/projects/horoscope-generator.jpg" alt="" />
        </a>
        <h1>Creative ideas</h1>
        <p className="home_subtitle">for app development</p>
        <p>

        </p>
      </section>

      <section className="home_grid_box2">
        <a className="home_card_image" href="/science">
          <img src="/images/projects/science-book.jpg" alt="" />
        </a>
        <h1>Perception</h1>
        <p className="home_subtitle">and pattern formal model as a fix-point of anticipations</p>
        <p>
        Formalization of the notions of perception and pattern are presented. 
        Perception of some pattern considers as continues process of anticipations (predictions) 
        by the pattern of entering stimulus and control of coincidence of anticipated and real stimulus. 
        As formalization of this process the fix-point of anticipations is proposed. 
        Computer simulations that demonstrate the efficiency of this model are carried out. 
        </p>
        <a href="/science">Explanation of the preceding annotation here</a>
      </section>

      <section className="home_grid_box3">
        <a className="home_card_image" href="/make/hydroponics">
          <img src="/images/projects/hydroponics.jpg" alt="" />
        </a>
        <h1>My Last Summer</h1>
        <p>
        Daytime in Novosibirsk is extremely long. 
        The Sun comes out early as 4am, 
        but as night person I wake up between 9 and 11am. 
        If I go out of bed at 9, 
        then I drink coffee, check social, post something and at 10 I’m ready to work. 
        What it means for me is that I change the pants and go to another room. 
        As an entrepreneur that has a contract with a foreign company all my work happens at home. 
        So first thing in the morning I check Slack, 
        email and the issue tracker We used the issue tracker before, 
        but without a dedicated manager 
        it is easy between programmers to communicate in Slack
         and track current tasks in your personal notes. 
        I use Trello for that. 
        Some notes I delete when they are done, 
        but other cards become a storage of important information. 
        In another words Trello is my personal knowledge base.
        </p>
        <a href="/make/hydroponics">Follow step by step guide of my hydroponics project</a>
      </section>

      <section className="home_grid_box4">
        <a className="home_card_image" href="/projects/pet-project-navigator">
          <img src="/images/projects/pet-project-navigator.jpg" alt="" />
        </a>
        <h1>Pet Project Navigator</h1>
        <p className="home_subtitle">
          A loaded todo list
        </p>
        <a href="/projects/pet-project-navigator">Find a story why Evernote is bad</a>
      </section>

      <section className="home_grid_box5">
        <h1>My board game</h1>
        <p className="home_subtitle">
          If board games you know do not give you joy anymore,
        </p>
        <p>
        then why not create your own?
        </p>
        <a href="/board-games">Read tabletop-game-devlog</a>
      </section>

      <section className="home_grid_box6">
        <h1>Imperial Russia</h1>
        <p className="home_subtitle">
          Historic unit converter
        </p>
        <a href="/projects/imperial-russia">Open source and already on Google Play</a>
      </section>

      
    </div>

  </Layout>
)

export default Index

