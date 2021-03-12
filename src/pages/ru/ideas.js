import React from "react"
import { Link } from "gatsby"
import Layout from "../../components/ruLayout"
import Banner from "../../components/banner"

const IdeasPage = () => (
  <Layout
    title="Идеи"
    section="ideas"
    languageName="Switch to english version"
    anotherLanguageLink="/ideas"
  >
    <Banner>
      <h1>Идеи</h1>
    </Banner>
    <section>

      <p>
      Что не хватает разработчику-одиночке? Времени. Находится новая привлекательная технология,
      ее нужно попробовать, изучить, найти решения в неочевидных местах, побиться головой о невидимые препятствия.
      На все это нужно время.
      </p>

      <div class="cards">
        <div class="card">
          <img src="/card_idea.png" alt="Idea" width="100px" />
          <div class="card-container">
            <h3><b>Идея</b></h3>
            <p>Здесь можно найти интересные идеи. Иметь план перед началом осуществления проекта.</p>
          </div>
        </div>

        <div class="card">
          <img src="/card_code.png" alt="Code" width="100px" />
          <div class="card-container">
            <h3><b>Код</b></h3>
            <p>Найти код, чтобы не изобретать велосипед и сосредоточиться на продукте. </p>
          </div>
        </div>

        <div class="card">
          <img src="/card_art.png" alt="Art" width="100px" />
          <div class="card-container">
            <h3><b>Дизайн</b></h3>
            <p>Нужно подобрать палитру, добавить фотографий и иллюстраций.</p>
          </div>
        </div>

      </div>

      <p>
      Вот <a href="/ru/projects/unsolved-problems">список разных концептов и мыслей</a>,
      которые могут зародить идею для нового проекта.
      </p>
      <p>
      Есть идеи, которые появляются в голове, но на них не находится времени и они отправляются в <a href="/ru/projects/limbo">Лимб</a>
      </p>

      <h2>Аграрный сдвиг 2021</h2>
      <p>
      У меня есть большие планы по изменению нашего отношения к сельскому
      хозяйству. Не могу сказать что большая часть молодого поколения разделит
      это видение, но не стоит отрицать, что становятся популярными идеи
      здорового питания, жизни на природе в дали от суеты, отсутствие зависимостей
      от телевизора, новостей и потребительства.
      </p>


    </section>
  </Layout>
)

export default IdeasPage
