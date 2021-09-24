import React from "react"
import PropTypes from "prop-types"
import Footer from "../components/ruFooter"
import Header from "../components/newHeader"
import Title from "../components/title"
import "./layout.css"

const RuNewLayout = ({
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
    <Title title={title} />
    <Header section={section}
      buttonText={buttonText}
      buttonLink={buttonLink}
      secondButtonText={secondButtonText}
      secondButtonLink={secondButtonLink}
      featuredImage={featuredImage}
      bannerParagraph={bannerParagraph}
    />
    <main>
      <div className="main-section">
        {!featuredImage && (
          <div className="mobile-header">{bannerParagraph}</div>
        )}
        {children}
        {showLikes && (
          <aside>
            <LikesPanel />
          </aside>
        )}
      </div>
    </main>
    <Footer languageName={languageName} languageLink={anotherLanguageLink} />
  </>
)

RuNewLayout.propTypes = {
  children: PropTypes.node.isRequired,
  languageName: PropTypes.node.isRequired,
  anotherLanguageLink: PropTypes.node.isRequired,
}

export default RuNewLayout
