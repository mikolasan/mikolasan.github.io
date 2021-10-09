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
  title,
  date,
  crumbs
}) => {
  return (
  <header>
    <NavigationBar active={section} />
    {featuredImage
    && <FeaturedImage
          imgFluid={featuredImage}
          title={title}
          date={date}
        />
    || <Banner
        buttonText={buttonText}
        buttonLink={buttonLink}
        secondButtonText={secondButtonText}
        secondButtonLink={secondButtonLink}
      >
        {bannerParagraph}
      </Banner>
    }
    <time className="post-date">{date}</time>
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