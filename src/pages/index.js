import React from "react"
import Layout from "../components/layout"
import FeaturedImage from "../components/featuredImage"
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'

export default ({ data }) => (
  <Layout>
    <FeaturedImage />
    <section>
      <div>
        <Breadcrumb
          crumbs={[]}
          crumbSeparator=" > "
          title=">>>"
        />
      </div>
      <h1>Index</h1>
      <p>Empty now... Rely on categories above</p>
    </section>
  </Layout>
)
