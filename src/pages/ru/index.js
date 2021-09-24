import React from "react"
import Layout from "../../components/ruNewLayout"
import * as styles from "./index.module.css"

const RuIndex = () => (
  <Layout
    title="/"
    languageName="Switch to english version"
    anotherLanguageLink="/"
    bannerParagraph={[<h1>/</h1>]}
  >
    <div className={styles.ruindex}>
      <section>
        <img src="/images/no-cover.jpg" />
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
        <img src="/images/no-cover.jpg" />
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
        <img src="/images/no-cover.jpg" />
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
        <img src="/images/no-cover.jpg" />
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
        <img src="/images/no-cover.jpg" />
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
        <img src="/images/no-cover.jpg" />
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
