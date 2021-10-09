import React from "react"
import PropTypes from "prop-types"
import Reactions from "./reactions"
import Footer from "../components/ruFooter"
import Header from "../components/ruHeader"
import Title from "../components/title"
import "./layout.css"

const RuLayout = ({
  children,
  showLikes,
  crumbs,
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
      <div className="main-section">
        {!featuredImage && (
          <div className="mobile-header">{bannerParagraph}</div>
        )}
        {children}
        {showLikes && (
          <aside>
            <Reactions />
          </aside>
        )}
      </div>
    </main>
    <Footer languageName={languageName} languageLink={anotherLanguageLink} />
  </>
)

RuLayout.propTypes = {
  children: PropTypes.node.isRequired,
  languageName: PropTypes.node.isRequired,
  anotherLanguageLink: PropTypes.node.isRequired,
}

export default RuLayout
