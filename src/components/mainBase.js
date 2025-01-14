import React from "react"
import MainCentered from "./mainCentered";
import MainFullscreen from "./mainFullscreen";
import MainList from "./mainList";
import MainNavigation from "./mainNavigation";

export default function MainBase(props) {
  switch (props.mainConf) {
  case "navigation":
    return (
      <MainNavigation {...props}>
        {props.children}
      </MainNavigation>
    )
  case "fullscreen":
    return (
      <MainFullscreen>
        {props.children}
      </MainFullscreen>
    )
  case "list":
    return (
      <MainList>
        {props.children}
      </MainList>
    )
  default:
    return (
      <MainCentered {...props}>
        {props.children}
      </MainCentered>
    )
  }

}
