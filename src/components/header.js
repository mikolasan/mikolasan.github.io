import React from "react"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"
import FeaturedImage from "../components/featuredImage"
import Banner from "../components/banner"
import NavigationBar from "../components/navigationBar"
import * as styles from "./header.module.css"

const Header = ({
  section,
  buttonText,
  buttonLink,
  secondButtonText,
  secondButtonLink,
  featuredImage,
  bannerParagraph,
  title,
  published,
  lastUpdated,
  crumbs
}) => {
  const wideImage = (
    <FeaturedImage
      image={featuredImage}
      title={title}
      buttonText={buttonText}
      buttonLink={buttonLink}
      secondButtonText={secondButtonText}
      secondButtonLink={secondButtonLink}
      published={published}
      lastUpdated={lastUpdated}
    >
      {bannerParagraph}
    </FeaturedImage>
    
  )
  const banner = bannerParagraph && (
    <Banner
      buttonText={buttonText}
      buttonLink={buttonLink}
      secondButtonText={secondButtonText}
      secondButtonLink={secondButtonLink}
      published={published}
      lastUpdated={lastUpdated}
    >
      {bannerParagraph}
    </Banner>
  ) || ``
  return (
  <header>
    <NavigationBar active={section} />
    {featuredImage && wideImage || banner}
    {crumbs && 
    <div className={styles.breadcrumbs}>
      <div className={styles.centerpart}>
        <Breadcrumb
          crumbs={crumbs}
          crumbSeparator=" "
          title={<img src="/images/pagoda.svg" className={styles.titleimg} />}
        />
        <div className={styles.nextline}></div>
      </div>
    </div>}
  </header>
)}

export default Header