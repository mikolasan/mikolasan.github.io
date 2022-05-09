import React from "react"
import PropTypes from "prop-types"
import NavigationBar from "./navigationBar"
import Footer from "./footer"
import Title from "./title"
import RelatedArticles from "./recentArticles"

class IndexLayout extends React.Component {
  constructor(props) {
    super(props)
    this.errorCallback = this.errorCallback.bind(this)
    this.state = {
      errorMessage: "null"
    }
  }

  errorCallback(errorMessage) {
    this.setState({
      errorMessage: errorMessage
    })
  }
  
  render() {
    const {
      children,
      title,
      section,
      languageName,
      anotherLanguageLink,
      bannerParagraph,
      recentArticles
    } = this.props
    return (
      <>
        <Title title={title + " - N"} />
        <header>
          <NavigationBar active={section} />
        </header>
        <main>
          <div>
            {children}
          </div>
        </main>
        <Footer languageName={languageName} languageLink={anotherLanguageLink} />
      </>
    )
  }
}

IndexLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default IndexLayout
