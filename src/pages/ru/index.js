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
          <h3><b>Идея</b></h3>
          <p>Здесь можно найти интересные идеи. Иметь план перед началом осуществления проекта.</p>
        </div>
      </div>

      <div class="card">
        <img src="card_code.png" alt="Code"/>
        <div class="card-container">
          <h3><b>Код</b></h3>
          <p>Найти код, чтобы не изобретать велосипед и сосредоточиться на продукте. </p>
        </div>
      </div>

      <div class="card">
        <img src="card_art.png" alt="Art" />
        <div class="card-container">
          <h3><b>Дизайн</b></h3>
          <p>Нужно подобрать палитру, добавить фотографий и иллюстраций.</p>
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
