import React from "react"
import Layout from "../../components/ruLayout"

const RuIndex = ({ data }) => (
  <Layout
    title="Программист, турист, сноб"
    languageName="Switch to english version"
    anotherLanguageLink="/"
    bannerParagraph={[<h1>программист - турист - сноб</h1>]}
  >
    <section>
      <div>

      <blockquote>
        <p>Свет в темноте, грохот в тиши:<br/>
          Шепот ночей, пламя свечи.<br/>
          Гибель мечты, смерть от любви,<br/>
          Жизнь без дверей, веришь ли ты?<br/>
        </p>
        <p>— Из моих личных записей самых лучших подписей на форумах</p>
      </blockquote>
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

      <div className="cards">
        <div className="card">
          <img src="/card_developer.png" alt="Idea" width="100px" />
          <div className="card-container">
            <h3><b>Программист</b></h3>
            <p>В свободное время я пишу программы в качестве развлечения.</p>
          </div>
        </div>

        <div className="card">
          <img src="/card_traveler.png" alt="Code" width="100px" />
          <div className="card-container">
            <h3><b>Турист</b></h3>
            <p>Когда сидеть дома становится в тягость, я отправляюсь в дорогу.</p>
          </div>
        </div>

        <div className="card">
          <img src="/card_snob.png" alt="Art" width="100px" />
          <div className="card-container">
            <h3><b>Сноб</b></h3>
            <p>Больше удовольствия получаешь придираясь к чужому коду.</p>
          </div>
        </div>

      </div>

      Думаю о своем бизнесе <a href="/ru/plan">здесь</a>.

      </div>
    </section>
  </Layout>
)

export default RuIndex
