import React from "react"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"
import FeaturedImage from "../components/featuredImage"
import Banner from "../components/banner"
import NavigationBar from "../components/navigationBar"

const Header = ({
  section,
  buttonText,
  buttonLink,
  secondButtonText,
  secondButtonLink,
  featuredImage,
  bannerParagraph,
  crumbs
}) => {
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
    {crumbs && 
    <div className="breadcrumbs">
      <div className="centerpart">
        <Breadcrumb
          crumbs={crumbs}
          crumbSeparator=" "
          title=""
        />
        <div className="nextline"></div>
      </div>
    </div>}
  </header>
)}

export default Header