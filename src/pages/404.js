import React from "react"
import Layout from "../components/layout"
import FeaturedImage from "../components/featuredImage"

const NotFoundPage = () => (
  <Layout>
    <FeaturedImage />
    <section>
      <br />
      <h1>404</h1>
      <p>Oops. The page you are looking for ... got lost.</p>
    </section>
  </Layout>
)

export default NotFoundPage
