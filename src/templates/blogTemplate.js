import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
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
  let alertAboutDraftStatus = ''
  if (linkPath.startsWith('/ru/blog')) {
    anotherLanguageLink = '/blog'
    languageName = "Switch to english version"
    alertAboutDraftStatus = 'Статья находится в активной разработке. Она опубликована в таком виде не для издевательства над читателем, а только потому что редактор сказал "можно".'
  } else if (linkPath.startsWith('/blog')) {
    anotherLanguageLink = '/ru/blog'
    languageName = "Switch to russian version"
    alertAboutDraftStatus = 'This article is not finished and not reviewed thoroughly. If for some reason you want to continue reading, do it at your own risk, but do not forget to come back later to enjoy the final version.'
  } else if (linkPath.startsWith('/ru/')) {
    anotherLanguageLink = linkPath.replace('/ru/', '/')
    languageName = "Switch to english version"
    alertAboutDraftStatus = 'Статья находится в активной разработке. Она опубликована в таком виде не для издевательства над читателем, а только потому что редактор сказал "можно".'
  } else {
    anotherLanguageLink = '/ru' + linkPath
    languageName = "Switch to russian version"
    alertAboutDraftStatus = 'This article is not finished and not reviewed thoroughly. If for some reason you want to continue reading, do it at your own risk, but do not forget to come back later to enjoy the final version.'
  }
  return (
    <Layout
      title={frontmatter.title}
      section={frontmatter.section || `blog`}
      showLikes={pageContext.showLikes}
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
      {frontmatter.draft && (<div className={styles.draftalert}>
        <img src="/draft.png" alt="Picturing not a whole whale"/>
        <p>{alertAboutDraftStatus}</p>
      </div>)}
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
