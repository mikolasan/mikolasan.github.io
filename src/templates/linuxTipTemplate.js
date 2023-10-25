import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import DraftAlert from "../components/draftAlert"
import InProgressAlert from "../components/inProgressAlert"
import { SEO } from "../components/seo"

export default function Template({ data, pageContext }) {
  const { markdownRemark } = data
  const { frontmatter, html, excerpt } = markdownRemark
  const url = pageContext.url
  const section = url.substring(1, url.indexOf('/', 1))
  const languageName = "Switch to russian version"
  const anotherLanguageLink = '/ru'
  let published = frontmatter.published || frontmatter.date
  let lastModified = frontmatter.lastModified || frontmatter.date
  // date fixes
  const lastModifiedDate = new Date(lastModified)
  const publishedDate = new Date(published)
  if (published && lastModified && lastModifiedDate < publishedDate) {
    [published, lastModified] = [lastModified, published];
  }
  if (lastModified === published) {
    lastModified = null
  }
  
  return (
    <Layout
      title={frontmatter.title}
      description={excerpt}
      published={published}
      lastUpdated={lastModified}
      section={frontmatter.section || section}
      showLikes={pageContext.showLikes}
      slug={pageContext.url}
      crumbs={pageContext.breadcrumb.crumbs}
      languageName={languageName}
      anotherLanguageLink={anotherLanguageLink}
      buttonText={frontmatter.buttonText}
      buttonLink={frontmatter.buttonLink}
      secondButtonText={frontmatter.secondButtonText}
      secondButtonLink={frontmatter.secondButtonLink}
      featuredImage={frontmatter.featuredImage}
      bannerParagraph={[
        <h1>{frontmatter.title}</h1>,
        <p dangerouslySetInnerHTML={{ __html: frontmatter.subtitle }} />
      ]}
    >
      {frontmatter.draft && <DraftAlert linkPath={url} />}
      {frontmatter.developing && <InProgressAlert linkPath={url} />}
      <div
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query blogQuery($absolutePath: String!) {
    markdownRemark(fileAbsolutePath: { eq: $absolutePath }) {
      html
      excerpt
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        published(formatString: "MMMM DD, YYYY")
        lastModified(formatString: "MMMM DD, YYYY")
        path
        title
        subtitle
        section
        draft
        developing
        buttonText
        buttonLink
        secondButtonText
        secondButtonLink
        featuredImage {
          publicURL
          childImageSharp {
            gatsbyImageData(
              layout: FULL_WIDTH,
              breakpoints: [576, 768, 922],
              transformOptions: {
                cropFocus: ATTENTION,
                fit: COVER
              },
              quality: 100
            )
          }
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