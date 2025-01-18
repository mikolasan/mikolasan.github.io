import React from "react"
import LayoutBase from "./layoutBase"
import LayoutNavigation from "./layoutNavigation"

export default function Layout(props) {
  switch (props.mainConf) {
  case "navigation":
    return (
      <LayoutNavigation
        {...props}
        languageName="en"
        publishedText="Published: "
        updatedText="Updated: "
      />
    )
  default:
    return (
      <LayoutBase
        {...props}
        languageName="en"
        publishedText="Published: "
        updatedText="Updated: "
      />
    )
  }
}