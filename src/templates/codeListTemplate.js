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
    crumbs={pageContext.breadcrumb.crumbs}
    languageName="Switch to russian version"
    anotherLanguageLink="/ru/devlog"
  >
    <PostList
      posts={data.allMarkdownRemark.edges}
      baseUrl="/code"
      pageContext={pageContext}
    />
    <div className="ideacards">
      <h2>Topics</h2>
      <SectionCard
        title="Linux"
        url="/linux"
      >
        <p>Tips and tricks for Linux users.
          Something commands carefully crafted, some knowledge found from the first source when no documentation is not available.
        </p>
        <p>
          Also this section is dedicated to custom linux development.
        </p>
      </SectionCard>

      <SectionCard
        title="C++"
        url="/code/cpp"
      >
        <p>
          Develop skills in C++ language by taking easy questionarries. 
        </p>
      </SectionCard>

      <SectionCard
        title="Gamedev"
        url="/gamedev"
      >
        <p>
          I dreamed about game developement since school. And now I'm professionally developing games for slot machines.
        </p>
      </SectionCard>

      <SectionCard
        title="Projects"
        url="/projects"
      >
        <p>
          My coding projects
        </p>
      </SectionCard>

      <SectionCard
        title="Ideas"
        url="/ideas"
      >
        <p>
          Ideas for new projects. 
        </p>
      </SectionCard>
    </div>
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