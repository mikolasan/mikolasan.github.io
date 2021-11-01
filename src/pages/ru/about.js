import React from "react"
import Layout from "../../components/ruLayout"
import * as styles from "./about.module.css"

const RuAbout = ({ pageContext }) => (
  <Layout
    title="О себе"
    section="about"
    crumbs={pageContext.breadcrumb.crumbs}
    languageName="Switch to english version"
    anotherLanguageLink="/about"
    bannerParagraph={[
      <h1>О себе</h1>,
      <p>Нейронные сети, байесовский вывод, разношёрстный девлог, паранормальные экспедиции, настольные игры и ролёвки, пиксель арт</p>
    ]}
  >
    <div className={styles.ruindex}>
      <section>
        <img src="/images/about/youtube.jpg" alt="Граненый стакан с мертини внутри. Стакан наполовину пуст"/>
        <div>
          <h2>Ютюб</h2>
          <p>
            Мой профиль - это прикладная математика. 
            Но каждую ночь я превращаюсь в гика одержимого пайкой, 
            микроконтроллерами, и 3Д принтерами. 
            Берусь за ремонт и восстановление вещей, которые никому не нужны, которых забыло даже время. 
            В этом хобби нет никакого давления по времени или качеству, поэтому я могу частенько ударяться в перфекционизм.
          </p>
          <div className={styles.action}>
            <a href="/ru/youtube">
              <button>Перейти к разделу</button>
            </a>
          </div>
        </div>
      </section>

      <section className={styles.inverse}>
        <img src="/images/about/cv.jpg" alt="Скриншот с резюме, которое в PDF формате" />
        <div>
          <h2>Резюме</h2>
          <p>
            Профессионально занимаюсь разработкой програмных продуктов в индустрии азартных игр.
          </p>
          <div className={styles.action}>
            <a href="/ru/cv">
              <button>К резюме</button>
            </a>
          </div>
        </div>
      </section>

      <section>
        <img src="/images/about/master.jpg" alt="Цифры подготовленные к распознаванию" />
        <div>
          <h2>Научная квалификация</h2>
          <p>
            Математики и нейробиологи не первый год ищут подходы к созданию интелектуальной машины,
            способной обучаться и самостоятельно делать прогнозы и принимать решения.
            Наиболее распространенными системами, используемыми в исследованиях, обязательно перечисляющихся
            в монографиях об искусственном интеллекте, являются нейронные и байесовы сети.
            Розенблатт в своей книге отмечает, что &#171;рассмотрение проблем, связанных с механизмом памяти,
            не может быть отделено от рассмотрения того, что именно запоминается, и поэтому перцептрон стал
            моделью некоторой более общей познающей системы, которая включает в себя как память, так и восприятие&#187;.
          </p>
          <div className={styles.action}>
            <a href="/ru/neural-networks/roadmap">
              <button>Разные мысли о своей научной работе</button>
            </a>
          </div>
        </div>
      </section>

      <section className={styles.inverse}>
        <img src="/images/about/twitter.jpg" alt="Портрет сгенерированный искуственным интеллектом на основании моей фотографии, немного восточных черт добавлено" />
        <div>
          <h2>Всегда живой в твиттере</h2>
          <p>
            Живое общение в ПМ, интересная лента без политики, качественная подборка пиксель арта
          </p>
          <div className={[styles.action, styles.twitter].join(" ")}>
            <a href="https://twitter.com/stakanmartini">
              <button>Почитать последние твиты</button>
            </a>
          </div>
        </div>
      </section>
    </div>
  </Layout>
)

export default RuAbout
