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
      <p>
      Essentially any project has backend, frontend, some storage or database, it uses a protocol and has a killer feature.
      Each reel in this slot machine represents a part from a typical project.
      Normally developers like to use the same language across all parts to spend minimum time setting up only one environment.
      </p>
      <SlotMachine />
    </section>
  </Layout>
)


export default LuckyIdeaGenerator
