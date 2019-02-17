import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

const IndexPage = () => (
  <Layout>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <Link to="/blog/basic-sudoku-classes">Go to page 2</Link>
  </Layout>
)

export default IndexPage
