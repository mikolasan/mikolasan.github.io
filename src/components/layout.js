import React from "react"

import PropTypes from "prop-types"
import { graphql, Link, StaticQuery } from "gatsby"
import FeaturedImage from "../components/featuredImage"
import Banner from "../components/banner"
import NavigationBar from "../components/navigationBar"
import LikesPanel from "../components/likesPanel"
import Footer from "../components/Footer"
import Header from "../components/header"
import Title from "../components/title"
import "./layout.css"
import "./breadcrumbs.css"

const Layout = ({ 
  children,
  pageContext,
  languageName,
  anotherLanguageLink,
  title,
  section,
  buttonText,
  buttonLink,
  secondButtonText,
  secondButtonLink,
  featuredImage,
  bannerParagraph
}) => { 
  const {
    breadcrumb: {crumbs},
    showLikes
  } = pageContext
  return (
  <StaticQuery
    query={graphql`
      query SiteInfoQuery {
        currentBuildDate {
          currentDate
        }
      }
    `}
    render={data => (
      <>
        <Title title={title + " - N"} />
        <Header section={section}
          buttonText={buttonText}
          buttonLink={buttonLink}
          secondButtonText={secondButtonText}
          secondButtonLink={secondButtonLink}
          featuredImage={featuredImage}
          bannerParagraph={bannerParagraph}
          crumbs={crumbs}
        />
        <main>
          <section>
            {!featuredImage && (
              <div className="mobile-header">
                {bannerParagraph}
                {(buttonText && buttonLink) && (
                  <div className="featured-action">
                    <a href={buttonLink}>
                      <button className="action-button">{buttonText}</button>
                    </a>
                  </div>
                ) || ''}
                {(secondButtonText && secondButtonLink) && (
                  <div className="featured-second-action">
                    <a href={secondButtonLink}>
                      <button className="second-action-button">{secondButtonText}</button>
                    </a>
                  </div>
                ) || ''}
              </div>
            )}
            {children}
          </section>
          {showLikes && (
            <section>
              <LikesPanel />
            </section>
          )}
        </main>
        <Footer languageName={languageName} languageLink={anotherLanguageLink} />
      </>
    )}
  />
)}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
