import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PostList from "../components/postList"
import SectionCard from "../components/sectionCard"
import { SEO } from "../components/seo"

const Science = ({ data, pageContext }) => (
  <Layout
    mainConf="list" 
    title={pageContext.title}
    section="science"
    bannerParagraph={pageContext.currentPage > 1 ? [
      <h1 key="title" id="_name1" itemProp="name">{pageContext.title}</h1>,
    ] : undefined}
  >
    {pageContext.currentPage === 1 && (
    <>
      <div className="ideacards">
        <SectionCard
          className="wide-card"
          title="Artificial Intelligence"
          url="/ai"
        >
          <p>
            What do you think when you see “AI researcher”? 
            Probably someone who recently jumped on a bandwagon of LLMs? 
            Well, that’s is not me.
            I started to dig into machine learning and data mining at the third year of uni (circa 2009). 
            This was even before AlexNet.
            I researched Bayesian networks and very niche Hierarchical Temporal Memory.
          </p>
          <p>
            In this section I present current developments in artificial intelligence, 
            critical analysis and new ideas
          </p>
        </SectionCard>
      </div>
      <div className="list-name">
        <h1 key="title" id="_name1" itemProp="name">{pageContext.title}</h1>
      </div>  
    </>) || ``}
    
    <PostList
      posts={data.allMarkdownRemark.edges}
      baseUrl="/science"
      pageContext={pageContext}
    />
    
  </Layout>
)

export default Science

export const query = graphql`
  query ScienceListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit,
      skip: $skip,
      sort: { frontmatter: {date: DESC}},
      filter: {
        fileAbsolutePath: { regex: "/markdown\/science\//"},
      }
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