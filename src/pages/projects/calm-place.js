import React from "react"
import Layout from "../../components/layout"
import FeaturedImage from "../../components/featuredImage"
import { SEO } from "../../components/seo"

const CalmPlace = () => (
  <Layout title="Calm place">
    <br />
    <h1>Calm place</h1>
    <p>
      I have listened about healing forests on a <a href="https://mysteriousuniverse.org/2017/04/17-14-mu-podcast/" target="_blank" rel="external nofollow noopener noreferrer">Mysterious Universe podcast</a>.
      They have discussed a book "The Nature Fix: Why Nature Makes us Happier, Healthier, and More Creative" by Florence Williams.
    </p>
    <p>
      So even if you are in the wilderness away from your neighbours listening music in 7am, dogs barking all day,
      from all machinery as air conditioner, fans; construction noise, you can still encounter airplanes flying over you.
      That is why I create a solution, to find a proper place in the nature where you will be really alone.
    </p>
    <p>
      OK, where is that place in the world without noise made by planes?
    </p>
    <p>
      To be concluded...
    </p>
  </Layout>
)

export default CalmPlace

export const Head = ({ location, data, pageContext }) => (
  <SEO 
    path={location.pathname}
    data={data}
    frontmatter={data?.markdownRemark?.frontmatter}
    pageContext={pageContext}
    title="Calm place"
  >

  </SEO>
)