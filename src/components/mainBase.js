import React from "react"
import MainCentered from "./mainCentered";
import MainFullscreen from "./mainFullscreen";

const MainBase = props => {
  return props.mainConf === "fullscreen" && (
    <MainFullscreen>
      {props.children}
    </MainFullscreen>
  ) || (
    <MainCentered {...props}>
      {props.children}
    </MainCentered>
  )
}

export default MainBase;