import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import DraftAlert from "../components/draftAlert"
import InProgressAlert from "../components/inProgressAlert"

export default function Template ({ data, pageContext }) {
  const { markdownRemark } = data
  const { frontmatter, html, excerpt } = markdownRemark
  const url = pageContext.url
  let section = url.substring(1, url.indexOf('/', 1))
  let languageName = "Switch to russian version"
  let anotherLanguageLink = '/ru'
  let published = frontmatter.published || frontmatter.date
  let lastModified = frontmatter.lastModified || frontmatter.date
  // date fixes
  let lastModifiedDate = new Date(lastModified)
  let publishedDate = new Date(published)
  if (published && lastModified && lastModifiedDate < publishedDate) {
    [published, lastModified] = [lastModified, published];
  }
  if (lastModified === published) {
    lastModified = null
  }
  const banner = (
    <h1 id="_name1" itemprop="name">{frontmatter.title}</h1>,
    <p dangerouslySetInnerHTML={{ __html: frontmatter.subtitle }} />
  )

  return (
    <Layout
      pageUrl={url}
      title={frontmatter.title}
      description={excerpt}
      published={published}
      lastUpdated={lastModified}
      section={frontmatter.section || section}
      showLikes={pageContext.showLikes}
      crumbs={pageContext.breadcrumb.crumbs}
      languageName={languageName}
      anotherLanguageLink={anotherLanguageLink}
      buttonText={frontmatter.buttonText}
      buttonLink={frontmatter.buttonLink}
      secondButtonText={frontmatter.secondButtonText}
      secondButtonLink={frontmatter.secondButtonLink}
      featuredImage={frontmatter.featuredImage}
      bannerParagraph={banner}
    >
      {frontmatter.draft && <DraftAlert linkPath={url} />}
      {frontmatter.developing && <InProgressAlert linkPath={url} />}
      <span itemscope itemtype="http://schema.org/Article" itemref="_name1 _author2 _datePublished3 _url5 _aggregateRating6">
        <div id="_articleBody4" itemprop="articleBody"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </span>
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

export { Head } from "./../components/head"