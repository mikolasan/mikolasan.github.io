import React from "react"
import { graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import DraftAlert from "../components/draftAlert"

export default function Template ({ data, pageContext }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const image = getImage(frontmatter.featuredImage);
  const url = pageContext.url
  let section = url.substring(1, url.indexOf('/', 1))
  let languageName = "Switch to russian version"
  let anotherLanguageLink = '/ru'
  return (
    <Layout
      title={frontmatter.title}
      published={frontmatter.published}
      lastUpdated={frontmatter.lastUpdated}
      section={section}
      showLikes={pageContext.showLikes}
      crumbs={pageContext.breadcrumb.crumbs}
      languageName={languageName}
      anotherLanguageLink={anotherLanguageLink}
      buttonText={frontmatter.buttonText}
      buttonLink={frontmatter.buttonLink}
      secondButtonText={frontmatter.secondButtonText}
      secondButtonLink={frontmatter.secondButtonLink}
      featuredImage={image}
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
        section
        draft
        subtitle
        buttonText
        buttonLink
        secondButtonText
        secondButtonLink
        featuredImage {
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
      parent {
        ... on File {
          fields {
            gitLogLatestDate(formatString: "MMMM DD, YYYY")
          }
          name
        }
      }
    }
  }
`
