import React from "react"
import Layout from "../components/layout"
import { SEO } from "../components/seo"

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
    <h3>From <a href="https://www.flaticon.com/" 
      target="_blank" 
      rel="external nofollow noopener noreferrer" 
      title="Flaticon">www.flaticon.com</a></h3>
    <ul>
      <li>
        <a href="https://www.flaticon.com/free-icon/programmer_2092430" 
          target="_blank" 
          rel="external nofollow noopener noreferrer" 
          title="programmer icons">Programmer icon created by srip</a>
      </li>
      <li>
        <a href="https://www.flaticon.com/free-icon/car_2706107" 
          target="_blank" 
          rel="external nofollow noopener noreferrer" 
          title="travel icons">Travel icon created by iconixar</a>
      </li>
      <li>
        <a href="https://www.flaticon.com/free-icons/global" 
          target="_blank" 
          rel="external nofollow noopener noreferrer" 
          title="global icons">Global icon created by Freepik</a>
      </li>
      <li>
        <a href="https://www.flaticon.com/free-icon/system-update_7409684" 
          target="_blank" 
          rel="external nofollow noopener noreferrer" 
          title="system update icons">System update icon created by Freepik</a>
      </li>
      <li>
        <a href="https://www.flaticon.com/free-icon/pagoda_858330" 
          target="_blank" 
          rel="external nofollow noopener noreferrer" 
          title="pagoda icons">Pagoda icon created by Pause08</a>
      </li>
      <li>
        <a href="https://www.flaticon.com/free-icon/neuron_1756394" 
          target="_blank" 
          rel="external nofollow noopener noreferrer" 
          title="neuron icons">Neuron icons created by Freepik</a>
      </li>
      <li>
        <a href="https://www.flaticon.com/free-icon/robot_862511" 
          target="_blank" 
          rel="external nofollow noopener noreferrer" 
          title="robot icons">Robot icons created by Good Ware</a>
      </li>
      <li>
        <a href="https://www.flaticon.com/free-icons/hydroponic" 
          target="_blank" 
          rel="external nofollow noopener noreferrer" 
          title="hydroponic icons">Hydroponic icons created by Good Ware - Flaticon</a>
      </li>
      <li>
        <a href="https://www.flaticon.com/free-icons/new" 
          target="_blank" 
          rel="external nofollow noopener noreferrer" 
          title="new icons">New icons created by AB Design - Flaticon</a>
      </li>
      <li>
        <a href="https://www.flaticon.com/free-icons/create" 
          target="_blank" 
          rel="external nofollow noopener noreferrer" 
          title="create icons">Create icons created by wanicon - Flaticon</a>
      </li>
      <li>
        <a href="https://www.flaticon.com/free-icons/paranormal" 
          target="_blank" 
          rel="external nofollow noopener noreferrer" 
          title="paranormal icons">Paranormal icons created by Smashicons - Flaticon</a>
      </li>
      <li>
        <a href="https://www.flaticon.com/free-icons/board-game" 
          target="_blank" 
          rel="external nofollow noopener noreferrer" 
          title="board-game icons">Board-game icons created by Freepik - Flaticon</a>
      </li>
    </ul>

  </Layout>
)


export default Credits

export const Head = ({ location, data, pageContext }) => (
  <SEO 
    path={location.pathname}
    data={data}
    frontmatter={data?.markdownRemark?.frontmatter}
    pageContext={pageContext}
    title="Credits"
  >

  </SEO>
)