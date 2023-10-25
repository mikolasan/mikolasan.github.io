import React from "react"
import { graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import Layout from "../../components/ru/layout"
import DraftAlert from "../../components/draftAlert"
import { SEO } from "./../../components/seo"

export default function Template ({ data, pageContext }) {
  const { markdownRemark } = data
  const { frontmatter, html, excerpt } = markdownRemark
  const image = getImage(frontmatter.featuredImage);
  const url = pageContext.url
  let section = url.substring(1, url.indexOf('/', 1))
  let languageName = "Switch to russian version"
  let anotherLanguageLink = '/ru'
  if (url.startsWith('/ru/')) {
    languageName = "Switch to english version"
    anotherLanguageLink = '/'
    if (url.startsWith('/ru/make/hydroponics')) {
      section = 'hydroponics'
    } else {
      section = url.substring(4, url.indexOf('/', 4))
    }
  }
  return (
    <Layout
      title={frontmatter.title}
      description={excerpt}
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
  query RuBlogQuery($absolutePath: String!) {
    markdownRemark(fileAbsolutePath: { eq: $absolutePath }) {
      html
      excerpt
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