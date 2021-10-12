import React from "react"
import Layout from "../../components/ruLayout"

const RuDevlog = ({ pageContext }) => (
  <Layout
    title="Разношерстный девлог"
    section="devlog"
    crumbs={pageContext.breadcrumb.crumbs}
    languageName="Switch to english version"
    anotherLanguageLink="/"
    bannerParagraph={[
      <h1>Разношерстный девлог</h1>,
      <p>Процесс разработки завораживает. Как из простых иструкций вырастают системы, как разбросанная логика начинает дружно работать. 
        Это, а также советы о повседневных проблемах в данном дневнике разработки. Много разных проектов</p>
    ]}
  >
    <p>Например, осенними вечерами 2021-го я уделяю много времени этим проектам:</p>
    <ul>
      <li>Сайт приюта</li>
      <li>Стратегическая игра с генератором комнат</li>
    </ul>
  </Layout>
)

export default RuDevlog
