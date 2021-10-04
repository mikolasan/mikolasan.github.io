import React from "react"
import Layout from "../components/layout"
import SlotMachine from "../components/slotMachine"

const LuckyIdeaGenerator = ({ pageContext }) => (
  <Layout
    title="Idea generator"
    section="ideas"
    crumbs={pageContext.breadcrumb.crumbs}
    bannerParagraph={[
      <h1>Idea generator</h1>,
      <p>
      If you want random unpredictable and fun project, then try this totally free slot machine
      from a slot developer who likes throwing cutting edge technologies in production.
      </p>
    ]}
  >
    <p>
    Essentially any project has backend, frontend, some storage or database, it uses a protocol and has a killer feature.
    Each reel in this slot machine represents a part from a typical project.
    Normally developers like to use the same language across all parts to spend minimum time setting up only one environment.
    </p>
    <SlotMachine />
  </Layout>
)


export default LuckyIdeaGenerator
