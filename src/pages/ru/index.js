import React from "react"
import Layout from "../../components/layout"
import FeaturedImage from "../../components/featuredImage"

export default ({ data }) => (
  <Layout languageName="Switch to english version" anotherLanguageLink="/">
    <div class="container">
      <FeaturedImage />
      <div class="container-text">
        <div class="featured-area">
          <div class="featured-text">
            <h1>Зачем мы здесь?</h1>

            <blockquote>
              <p>Свет в темноте, грохот в тиши:<br/>
                Шепот ночей, пламя свечи.<br/>
                Гибель мечты, смерть от любви,<br/>
                Жизнь без дверей, веришь ли ты?<br/>
              </p>
              <p>— Из моих личных записей самых лучших подписей на форумах</p>
            </blockquote>

          </div>
          {/* <div class="featured-action">
            <a href="/projects/ideas">
            <button class="action-button">В Проекты!</button>
            </a>
          </div> */}
        </div>
      </div>
    </div>
    <section>

    

<div>

<br/>
<p>
Здравствуйте. 
</p>

<p>
Я - программист. 
</p>

<p>
Я пишу программы, потому что мне нравится идеальный мир организованный внутри компьютера. 
Когда я пишу код, я на самом деле пишу инструкции, которые затем будут в точности исполнены 
процессором, а заранее известные данные дадут заранее ожидаемый результат. Все просто идеально.
</p>

<p>
Что не хватает разработчику-одиночке? Времени. Находится новая привлекательная технология, 
ее нужно попробовать, изучить, найти решения в неочевидных местах, побиться головой о невидимые препятствия. 
На все это нужно время.
</p>

<div class="cards">
      <div class="card">
        <img src="card_idea.png" alt="Idea"/>
        <div class="card-container">
          <h4><b>Idea</b></h4>
          <p>Get an idea here. This the first step and it is very important.</p>
        </div>
      </div>

      <div class="card">
        <img src="card_code.png" alt="Code"/>
        <div class="card-container">
          <h4><b>Code</b></h4>
          <p>Find source code that fits to your idea. Any language. Any license.</p>
        </div>
      </div>

      <div class="card">
        <img src="card_art.png" alt="Art" />
        <div class="card-container">
          <h4><b>Art</b></h4>
          <p>Find good art. I have a list where to look for.</p>
        </div>
      </div>
      
      <div class="card">
        <img src="card_music.png" alt="Music" />
        <div class="card-container">
          <h4><b>Music</b></h4>
          <p>Find good music. I have a list where to look for.</p>
        </div>
      </div>
    </div>

<p>
Измерить, на что хватило времени мне, можно в разделе <a href="/ru/projects">Проекты</a>.
</p>

</div>
    </section>
  </Layout>
)
