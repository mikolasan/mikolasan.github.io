import React from "react"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"
import NavigationBar from "../components/navigationBar"
import * as styles from "./header.module.css"

const Header = props => {
  let crumbsLine = <div className="bottomline"></div>
  if (props.crumbs) {
    let _crumbs = [...props.crumbs]
    if (props.language !== "en") {
      const root = _crumbs.shift(); // remove the first element
      if (_crumbs.length === 1) {
        _crumbs = []
      } else if (_crumbs.length > 0) {
        // update the crumb label, keep `pathname`
        _crumbs[0].crumbLabel = root.crumbLabel
      }
    }
    const n = _crumbs.length
    if (n > 0) {
      const lastLabel = _crumbs[n - 1].crumbLabel
      if (n > 3
          || lastLabel !== "neural-networks" 
          && lastLabel !== "board-games" 
          && lastLabel !== "3d-prints" 
          && lastLabel.indexOf("-") !== -1) {
        _crumbs.pop()
      }
    }

    crumbsLine = (
      <div className={styles.breadcrumbs}>
        <div className={styles.centerpart}>
          <Breadcrumb
            crumbs={_crumbs}
            crumbSeparator=" "
            title={<p className={styles.titleimg}>N</p>}
          />
          <div className={styles.nextline}></div>
        </div>
      </div>
    )
  }

  return (
    <header>
      <NavigationBar {...props} />
      {crumbsLine}
    </header>
  )
}

export default Header