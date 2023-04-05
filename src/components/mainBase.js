import React from "react"
import MainCentered from "./mainCentered";
import MainFullscreen from "./mainFullscreen";

const MainBase = ({
  mainConf,
  children,
  published,
  publishedText,
  lastUpdated,
  updatedText,
  showLikes,
  buttonText,
  buttonLink,
  secondButtonText,
  secondButtonLink,
  bannerParagraph,
  recentArticles,
  errorCallback,
  errorMessage
}) => {
  return mainConf === "fullscreen" && (
    <MainFullscreen>
      {children}
    </MainFullscreen>
  ) || (
    <MainCentered
      children={children}
      publishedText={publishedText}
      published={published}
      updatedText={updatedText}
      lastUpdated={lastUpdated}
      showLikes={showLikes}
      buttonText={buttonText}
      buttonLink={buttonLink}
      secondButtonText={secondButtonText}
      secondButtonLink={secondButtonLink}
      bannerParagraph={bannerParagraph}
      recentArticles={recentArticles}
      errorCallback={errorCallback}
      errorMessage={errorMessage}
    >
      {children}
    </MainCentered>
  )
}

export default MainBase;