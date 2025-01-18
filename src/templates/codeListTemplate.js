import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PostList from "../components/postList"
import SectionCard from "../components/sectionCard"
import { SEO } from "../components/seo"

const Code = ({ data, pageContext }) => (
  <Layout
    mainConf="list"
    title={pageContext.title}
    section="code"
    bannerParagraph={pageContext.currentPage > 1 ? [
      <h1 key="title" id="_name1" itemProp="name">Coding</h1>,
    ] : undefined}
  >
    {pageContext.currentPage === 1 && (
    <>
      <div className="ideacards">
        <SectionCard
          title="Linux"
          url="/linux"
        >
          <p>
            Custom linux development, carefully crafted commands and bash-fu
          </p>
        </SectionCard>

        <SectionCard
          title="C++"
          url="/code/cpp"
        >
          <p>
          My collection of C++ language snippets
          </p>
        </SectionCard>

        <SectionCard
          title="Gamedev"
          url="/gamedev"
        >
          <p>
          My game jam notes and other more serious endeavors in game development
          </p>
        </SectionCard>

        <SectionCard
          title="Projects"
          url="/projects"
        >
          <p>
          Professional efforts in developing and publishing free and open source products
          </p>
        </SectionCard>

        <SectionCard
          title="Ideas"
          url="/ideas"
        >
          <p>
          Concepts sitting on the backburner that my ADHD brain keeps spitting out
          </p>
        </SectionCard>
      </div>
      <div className="list-name">
        <h1 key="title" id="_name1" itemProp="name">Coding</h1>
      </div>
    </>) || ``}
    <PostList
      posts={data.allMarkdownRemark.edges}
      baseUrl="/code"
      pageContext={pageContext}
    />
  </Layout>
)

export default Code

export const query = graphql`
  query CodeListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit,
      skip: $skip,
      sort: { frontmatter: {lastModified: DESC}},
      filter: { fileAbsolutePath: { regex: "/markdown\/code\/(?!cpp)/"} }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date
            developing
            previewImage {
              childImageSharp {
                gatsbyImageData(
                  layout: FULL_WIDTH,
                  breakpoints: [278],
                  transformOptions: {
                    cropFocus: ATTENTION,
                    fit: COVER
                  },
                  quality: 70
                )
              }
            }
          }
          excerpt
          fileAbsolutePath
        }
      }
    }
  }
`

export const Head = ({ location, data, pageContext }) => (
  <SEO 
    path={location.pathname}
    data={data}
    frontmatter={data?.markdownRemark?.frontmatter}
    pageContext={pageContext}
  >

  </SEO>
)