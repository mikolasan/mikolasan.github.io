import React from "react"

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
  bannerParagraph
}) => (
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
  </header>
)

export default Header