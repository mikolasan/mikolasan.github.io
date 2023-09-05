import React from "react"
import MainCentered from "./mainCentered";
import MainFullscreen from "./mainFullscreen";
import MainList from "./mainList";

export default function MainBase(props) {
  switch (props.mainConf) {
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
