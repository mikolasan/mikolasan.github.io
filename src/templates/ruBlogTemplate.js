import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/ruLayout"
import DraftAlert from "../components/draftAlert"

export default function Template ({ data, pageContext }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  let featuredImgFluid = null;
  if (frontmatter.featuredImage) {
    featuredImgFluid = frontmatter.featuredImage.childImageSharp.gatsbyImageData
  }
  const url = pageContext.url
  let section = url.substring(1, url.indexOf('/', 1))
  let languageName = "Switch to russian version"
  let anotherLanguageLink = '/ru'
  if (url.startsWith('/ru/')) {
    languageName = "Switch to english version"
    anotherLanguageLink = '/'
    section = url.substring(4, url.indexOf('/', 4))
  }
  return (
    <Layout
      title={frontmatter.title}
      published={frontmatter.date}
      lastUpdated={markdownRemark.parent.fields.gitLogLatestDate}
      section={section}
      showLikes={pageContext.showLikes}
      crumbs={pageContext.breadcrumb.crumbs}
      languageName={languageName}
      anotherLanguageLink={anotherLanguageLink}
      buttonText={frontmatter.buttonText}
      buttonLink={frontmatter.buttonLink}
      secondButtonText={frontmatter.secondButtonText}
      secondButtonLink={frontmatter.secondButtonLink}
      featuredImage={featuredImgFluid}
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
  query RuBlogQuery($absolutePath: String!) {
    markdownRemark(fileAbsolutePath: { eq: $absolutePath }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
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
