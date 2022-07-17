import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import DraftAlert from "../components/draftAlert"

export default function Template ({ data, pageContext }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const url = pageContext.url
  let section = url.substring(1, url.indexOf('/', 1))
  let languageName = "Switch to russian version"
  let anotherLanguageLink = '/ru'
  return (
    <Layout
      pageUrl={url}
      title={frontmatter.title}
      published={frontmatter.date}
      lastUpdated={frontmatter.lastModified}
      section={section}
      showLikes={pageContext.showLikes}
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
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        published(formatString: "MMMM DD, YYYY")
        lastModified(formatString: "MMMM DD, YYYY")
        path
        title
        subtitle
        section
        draft
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
