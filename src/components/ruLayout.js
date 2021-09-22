import React from "react"
import PropTypes from "prop-types"
import Footer from "../components/ruFooter"
import Header from "../components/header"
import Title from "../components/title"
import "./layout.css"

const RuLayout = ({
  children,
  showLikes,
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
}) => (
  <>
    <Title title={title + " - Николай Неупокоев"} />
    <Header section={section}
      buttonText={buttonText}
      buttonLink={buttonLink}
      secondButtonText={secondButtonText}
      secondButtonLink={secondButtonLink}
      featuredImage={featuredImage}
      bannerParagraph={bannerParagraph}
    />
    <main>
      {!featuredImage && (
        <div className="mobile-header">{bannerParagraph}</div>
      )}
      {children}
      {showLikes && (
        <aside>
          <LikesPanel />
        </aside>
      )}
    </main>
    <Footer languageName={languageName} langugeLink={anotherLanguageLink} />
  </>
)

RuLayout.propTypes = {
  children: PropTypes.node.isRequired,
  languageName: PropTypes.node.isRequired,
  anotherLanguageLink: PropTypes.node.isRequired,
}

export default RuLayout
