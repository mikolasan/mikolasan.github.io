import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import DraftAlert from "../components/draftAlert"
import * as styles from "./blogTemplate.module.css"

export default function Template ({ data, pageContext, location }) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  let featuredImgFluid = null;
  if (frontmatter.featuredImage) {
    featuredImgFluid = frontmatter.featuredImage.childImageSharp.gatsbyImageData
  }
  const linkPath = frontmatter.path
  let anotherLanguageLink = ''
  let languageName = ''
  if (linkPath.startsWith('/ru/blog')) {
    anotherLanguageLink = '/blog'
    languageName = "Switch to english version"
  } else if (linkPath.startsWith('/blog')) {
    anotherLanguageLink = '/ru/blog'
    languageName = "Switch to russian version"
  } else if (linkPath.startsWith('/ru/')) {
    anotherLanguageLink = linkPath.replace('/ru/', '/')
    languageName = "Switch to english version"
  } else {
    anotherLanguageLink = '/ru' + linkPath
    languageName = "Switch to russian version"
  }
  return (
    <Layout
      title={frontmatter.title}
      section={frontmatter.section || `blog`}
      pageContext={pageContext}
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
      {featuredImgFluid && (<h1>{frontmatter.title}</h1>)}
      <p className={styles.postedon}>{frontmatter.date}</p>
      {frontmatter.draft && <DraftAlert linkPath={linkPath} />}
      <div
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query blogQuery($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
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
                fit: COVER,
                duotone: {
                  highlight: "#5C6784",
                  shadow: "#1D263B"
                }
              },
              quality: 100
            )
          }
        }
      }
    }
  }
`
