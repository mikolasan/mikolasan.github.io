import React from "react"
import Layout from "../components/layout"
import Banner from "../components/banner"
import SlotMachine from "../components/slotMachine"

const LuckyIdeaGenerator = () => (
  <Layout>
    <Banner>
      <h1>Lucky idea generator</h1>
      <p>
      If you want random unpredictable and fun project, then try this totally free slot machine
      from a slot developer who likes throwing cutting edge technologies in production.
      </p>
    </Banner>
    <section>
      <SlotMachine />
    </section>
  </Layout>
)


export default LuckyIdeaGenerator
