import React from "react"
import Layout from "../../components/ru/layout"
import { SEO } from "../../components/seo"

const IdeasPage = () => (
  <Layout
    title="Идеи"
    section="ideas"
    languageName="Switch to english version"
    anotherLanguageLink="/ideas"
    bannerParagraph={[<h1>Идеи</h1>]}
  >
    <p>
    Что не хватает разработчику-одиночке? Времени. Находится новая привлекательная технология,
    ее нужно попробовать, изучить, найти решения в неочевидных местах, побиться головой о невидимые препятствия.
    На все это нужно время.
    </p>

    <div className="cards">
      <div className="card">
        <img src="/card_idea.png" alt="Idea" width="100px" />
        <div className="card-container">
          <h3><b>Идея</b></h3>
          <p>Здесь можно найти интересные идеи. Иметь план перед началом осуществления проекта.</p>
        </div>
      </div>

      <div className="card">
        <img src="/card_code.png" alt="Code" width="100px" />
        <div className="card-container">
          <h3><b>Код</b></h3>
          <p>Найти код, чтобы не изобретать велосипед и сосредоточиться на продукте. </p>
        </div>
      </div>

      <div className="card">
        <img src="/card_art.png" alt="Art" width="100px" />
        <div className="card-container">
          <h3><b>Дизайн</b></h3>
          <p>Нужно подобрать палитру, добавить фотографий и иллюстраций.</p>
        </div>
      </div>

    </div>

    <p>
    Вот <a href="/ru/devlog/unsolved-problems">список разных концептов и мыслей</a>,
    которые могут зародить идею для нового проекта.
    </p>
    <p>
    Есть идеи, которые появляются в голове, но на них не находится времени и они отправляются в <a href="/ru/devlog/limbo">Лимб</a>
    </p>

    <h2>Аграрный сдвиг 2021</h2>
    <p>
    У меня есть большие планы по изменению нашего отношения к сельскому
    хозяйству. Не могу сказать что большая часть молодого поколения разделит
    это видение, но не стоит отрицать, что становятся популярными идеи
    здорового питания, жизни на природе в дали от суеты, отсутствие зависимостей
    от телевизора, новостей и потребительства.
    </p>

    <ul>
      <li><a href="/ru/make/hydroponics/">Обзор материалов по теме Гидропоника</a></li>
      <li><a href="/ru/make/hydroponics/nutrient-film-technique">Nutrient Film Technique (NFT) - гидропонный метод _проточной тонкослойной подачи_ питательного вещества</a></li>
      <li><a href="/ru/make/hydroponics/drip-system">Гидропоника: собираем систему капельного орошения</a></li>
      <li><a href="/ru/make/hydroponics/sensors">Гидропоника: сенсоры</a></li>
    </ul>
  </Layout>
)

export default IdeasPage

export const Head = ({ location, data, pageContext }) => (
  <SEO 
    path={location.pathname}
    data={data}
    frontmatter={data?.markdownRemark?.frontmatter}
    pageContext={pageContext}
    title="Идеи"
  >

  </SEO>
)