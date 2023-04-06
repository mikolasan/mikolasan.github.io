import React from "react"
import Layout from "../components/layout"

const Credits = ({ pageContext }) => (
  <Layout
    title="Credits"
    section="about"
    crumbs={pageContext.breadcrumb.crumbs}
    bannerParagraph={[
      <h1>Credits</h1>,
      <p>
      Every movie has credits. Every website uses pitures. Because I suck at drawing, I use freebie resources. And I don't mind to give attribute to their authors. 
      </p>
    ]}
  >
    <h2>Icons</h2>
    <h3>From <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></h3>
    <ul>
      <li>
        <a href="https://www.flaticon.com/free-icon/programmer_2092430" title="programmer icons">Programmer icon created by srip</a>
      </li>
      <li>
        <a href="https://www.flaticon.com/free-icon/car_2706107" title="travel icons">Travel icon created by iconixar</a>
      </li>
      <li>
        <a href="https://www.flaticon.com/free-icons/global" title="global icons">Global icon created by Freepik</a>
      </li>
      <li>
        <a href="https://www.flaticon.com/free-icon/system-update_7409684" title="system update icons">System update icon created by Freepik</a>
      </li>
      <li>
        <a href="https://www.flaticon.com/free-icon/pagoda_858330" title="pagoda icons">Pagoda icon created by Pause08</a>
      </li>
      <li>
        <a href="https://www.flaticon.com/free-icon/neuron_1756394" title="neuron icons">Neuron icons created by Freepik</a>
      </li>
      <li>
        <a href="https://www.flaticon.com/free-icon/robot_862511" title="robot icons">Robot icons created by Good Ware</a>
      </li>
      <li>
        <a href="https://www.flaticon.com/free-icons/hydroponic" title="hydroponic icons">Hydroponic icons created by Good Ware - Flaticon</a>
      </li>
      <li>
        <a href="https://www.flaticon.com/free-icons/new" title="new icons">New icons created by AB Design - Flaticon</a>
      </li>
      <li>
        <a href="https://www.flaticon.com/free-icons/create" title="create icons">Create icons created by wanicon - Flaticon</a>
      </li>
      <li>
        <a href="https://www.flaticon.com/free-icons/paranormal" title="paranormal icons">Paranormal icons created by Smashicons - Flaticon</a>
      </li>
      <li>
        <a href="https://www.flaticon.com/free-icons/board-game" title="board-game icons">Board-game icons created by Freepik - Flaticon</a>
      </li>
    </ul>

  </Layout>
)


export default Credits