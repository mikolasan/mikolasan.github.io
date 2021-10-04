import React from "react"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"
import FeaturedImage from "../components/featuredImage"
import Banner from "../components/banner"
import NavigationBar from "../components/ruNavigationBar"

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
  return (
  <header>
    <NavigationBar active={section} />
    {featuredImage
    && (<FeaturedImage imgFluid={featuredImage} />)
    || (
      <Banner
        buttonText={buttonText}
        buttonLink={buttonLink}
        secondButtonText={secondButtonText}
        secondButtonLink={secondButtonLink}
      >
        {bannerParagraph}
      </Banner>
    )}
    {crumbs &&
    <div className="breadcrumbs">
      <Breadcrumb
        crumbs={crumbs}
        crumbSeparator=" "
        title=""
      />
    </div>}
  </header>
)}

export default Header