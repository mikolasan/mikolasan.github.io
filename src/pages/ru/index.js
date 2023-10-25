import React from "react"
import Layout from "../../components/ru/layout"
import { SEO } from "./../../components/seo"
import * as styles from "./index.module.css"

const RuIndex = ({ pageContext }) => (
  <Layout
    title="Лаборатория Н"
    section="root"
    crumbs={pageContext.breadcrumb.crumbs}
    languageName="Switch to english version"
    anotherLanguageLink="/"
    bannerParagraph={[<h1>Наука, мастерская, девлог</h1>]}
  >
    <div className={styles.newproject}>
      <h2>Новый проект!</h2>
      <p>
        Во-первых, это стартап. Реальный стартап, но без серьезного плана.
      </p>
      <p>
        Во-вторых, я предоставлю сообществу возможность влиять на развитие проекта, принимать решения вместе.
      </p>
      <p>
        Эти вещи происходят в <a href="https://twitter.com/stakanmartini" target="_blank" rel="external nofollow noopener noreferrer">моем твиттере</a>,
        где можно писать личные сообщения, 
        следить за каждым шагом проекта в момент, когда он реально происходит,
        помогать в сиюминутных вопросах, а также вносить вклад в более продолжительные опросы.
      </p>
      <p>
        Итак, озаглавим основные моменты гидропонного проекта: 
        корпус, детали водяного цикла, система мониторинга, рука-манипулятор для захвата ягод, 
        система автоматической посадки из семян, библиотека заболеваний растений, выявление причин неурожая.
      </p>
      <p>
        Вся информация такая как видео, ссылки на компоненты, заметки из блога - всё это собрано в <a href="/ru/make/hydroponics">специальном разделе</a>.
      </p>
      <div className={[styles.action, styles.hydro].join(" ")}>
        <a href="/ru/make/hydroponics">
          <button>Перейти к разделу</button>
        </a>
      </div>
    </div>

    <div className={styles.ruindex}>
      <section>
        <img src="/images/neural-networks.jpg" />
        <div>
          <h2>Нейронные сети</h2>
          <p>
            Попытка людей понять себя и формализовать свои маленькие нейрончики в надежде, 
            что все элеметарное - просто, а в совокупности они могут создавать невероятные выводы
          </p>
          <div className={styles.action}>
            <a href="/ru/neural-networks">
              <button>Перейти к разделу</button>
            </a>
          </div>
        </div>
      </section>

      <section className={styles.inverse}>
        <img src="/images/make_2.jpg" />
        <div>
          <h2>Мастерская</h2>
          <p>
            Встраиваемые системы, маленькие компьютеры, пайка компонентов, 3Д печать - вот это всё
          </p>
          <div className={styles.action}>
            <a href="/ru/make">
              <button>Перейти к разделу</button>
            </a>
          </div>
        </div>
      </section>

      <section>
        <img src="/images/devlog.jpg" />
        <div>
          <h2>Разношерстный девлог</h2>
          <p>
            Процесс разработки завораживает. Как из простых иструкций вырастают системы, как разбросанная логика начинает дружно работать. 
            Это и просто советы о житейских повседневных проблемах в данном дневнике разработки. Много разных проектов.
          </p>
          <div className={styles.action}>
            <a href="/ru/devlog">
              <button>Перейти к разделу</button>
            </a>
          </div>
        </div>
      </section>

      <section className={styles.inverse}>
        <img src="/images/paranormal.jpg" />
        <div>
          <h2>Паранормальные экспедиции</h2>
          <p>
            Есть ли в Новосибирске haunted места? Такие, с чертовщинкой, 
            как например Бирмингемский металлургический завод буржуя Слосса или как «Пойма» в национальном заповеднике Блэкуотер.
          </p>
          <div className={styles.action}>
            <a href="/ru/paranormal">
              <button>Перейти к разделу</button>
            </a>
          </div>
        </div>
      </section>

      <section>
        <img src="/images/board-games.jpg" />
        <div>
          <h2>Настольные игры и ролёвки</h2>
          <p>
            Так же как книги, фильмы и музыка игры позоволяют погрузиться в совершенно иной вымышленный мир,
            живущий по своим правилам. Прелесть игровых механик, поиск новых стратегий - это все невероятно интересно,
            но еще интереснее может оказаться создание своей игры
          </p>
          <div className={styles.action}>
            <a href="/ru/board-games">
              <button>Перейти к разделу</button>
            </a>
          </div>
        </div>
      </section>

      <section className={styles.inverse}>
        <img src="/images/blog.jpg" />
        <div>
          <h2>Остальное</h2>
          <p>И всё остальное остается в этом блоге.</p>
          <div className={styles.action}>
            <a href="/ru/blog">
              <button>Перейти к разделу</button>
            </a>
          </div>
        </div>
      </section>
    </div>
  </Layout>
)

export default RuIndex

export const Head = ({ location, data, pageContext }) => (
  <SEO 
    path={location.pathname}
    data={data}
    frontmatter={data?.markdownRemark?.frontmatter}
    pageContext={pageContext}
  >

  </SEO>
)