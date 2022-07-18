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
        <a className="home_card_image" href="/ideas/games/horror-game">
          <img src="/images/home/horror-game.jpg" alt="" />
          <h1>Horror game</h1>
        </a>
        <p className="home_subtitle">What kind of horror games</p>
        <p>with a twist do you miss?</p>
        <p><small>Header picture is created by BeFunky online tool</small></p>
      </section>

      <section className="home_grid_box2">
        <a className="home_card_image" href="/blog/windows-clone">
          <img src="/images/home/windows-clone.jpg" alt="" />
          <h1>Windows clone</h1>
        </a>
        <p className="home_subtitle">What do you need to know when you clone Windows 10 from one drive to another?</p>
        <p>
        This way you do backups. Windows and programs can be reinstalled,
        but your files—they made out of sweat, pain and love,
        it’s tough to create them again and it hurts when you lose them.
        </p>
        <p>
        If you found this article from a google search trying to fix a rare message on Blue Screen of death from Windows,
        then here are my few observations that can help.
        </p>
        <a href="/blog/windows-clone">What do you need to know when you clone Windows 10 from one drive to another?</a>
      </section>

      <section className="home_grid_box3">
        <a className="home_card_image" href="/make/robot-coach">
          <img src="/images/home/robot-coach.jpg" alt="" />
          <h1>Coach Robot</h1>
        </a>
        <p className="home_subtitle">Robot-companion</p>
        <p> – it is sitting on your desk and monitors you.</p>
        <p>It plans and organizes your work. 
        If you stuck on social media website, it will tell you get back to work.
        And the opposite, it reminds when to do a break.
        Plus a screen with emotion expressions and wheels to poke around on the table and find a charger station when needed.
        </p>
        <p>
        So it’s like a coach.
        It should pose an angry reaction when you are out of track in your plan.
        </p>
        <p>
        I'm aiming for a physical device.
        It will sit on a desk - a physical table where my laptop is. 
        </p>
        <a href="/make/robot-coach">I decided to start simple</a>
      </section>

      <section className="home_grid_box4">
        <a className="home_card_image" href="/blog/most-addictive-games">
          <img src="/images/home/most-addictive-games.jpg" alt="" />
          <h1>The most addictive games</h1>
        </a>
        <p className="home_subtitle">
        I purposely do not include games from the current century 😄
        </p>
        <a href="/blog/most-addictive-games">Here is my list of the most addictive games.</a>
      </section>

      <section className="home_grid_box5">
        <a href="/gamedev/best-practices-of-game-jams">
          <h1>Best practices of Game Jams</h1>
        </a>
        <a href="/gamedev/best-practices-of-game-jams">3 things you should know before joining a game jam</a>
      </section>

      <section className="home_grid_box6">
        <a href="/gamedev/fire">
          <h1>Fire!</h1>
        </a>
        <p className="home_subtitle">
        Gameplay was highly influenced by Crimsonland and Serious Sam
        </p>
        <a href="/gamedev/fire">Top down shooter made with Game Maker</a>
      </section>

      
    </div>

  </Layout>
)

export default Index

