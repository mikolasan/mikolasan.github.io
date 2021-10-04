import React from "react"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"
import FeaturedImage from "../components/featuredImage"
import Banner from "../components/banner"
import NavigationBar from "../components/navigationBar"

class Header extends React.Component {
  render() {
    const {
      section,
      buttonText,
      buttonLink,
      secondButtonText,
      secondButtonLink,
      featuredImage,
      bannerParagraph,
      crumbs
    } = this.props
    const wideImage = (<FeaturedImage imgFluid={featuredImage} />)
    const banner = bannerParagraph && (
        <Banner
          buttonText={buttonText}
          buttonLink={buttonLink}
          secondButtonText={secondButtonText}
          secondButtonLink={secondButtonLink}
        >
          {bannerParagraph}
        </Banner>
      )
    return (
      <header>
        <NavigationBar active={section} />
        {featuredImage && wideImage || banner}
        <div className="breadcrumbs">
          <Breadcrumb
            crumbs={crumbs}
            crumbSeparator=" "
            title=""
          />
        </div>
      </header>
    )
  }
}

export default Header