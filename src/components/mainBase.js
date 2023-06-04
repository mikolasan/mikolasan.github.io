import { default as React, useSyncExternalStore } from "react"
import MainCentered from "./mainCentered";
import MainFullscreen from "./mainFullscreen";
import MainWide from "./mainWide";
import { windowSizeStore } from "../components/windowSizeStore"

export default function MainBase(props) {
  const { height, width } = useSyncExternalStore(
    windowSizeStore.subscribe,
    windowSizeStore.getSnapshot)
  return props.mainConf === "fullscreen" && (
    <MainFullscreen>
      {props.children}
    </MainFullscreen>
  ) || (width > 1660 && (
    <MainWide {...props}>
      {props.children}
    </MainWide>
  ) ||

    <MainCentered {...props}>
      {props.children}
    </MainCentered>
  )
}
