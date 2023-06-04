import React from "react"
import MainCentered from "./mainCentered";
import MainFullscreen from "./mainFullscreen";
import MainWide from "./mainWide";

const MainBase = props => {
  return props.mainConf === "fullscreen" && (
    <MainFullscreen>
      {props.children}
    </MainFullscreen>
  ) || (window.innerWidth > 1660 && (
    <MainWide {...props}>
      {props.children}
    </MainWide>
  ) ||

    <MainCentered {...props}>
      {props.children}
    </MainCentered>
  )
}

export default MainBase;