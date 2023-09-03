import React from "react"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"

import * as styles from "./header.module.css"

const SuperCrumbs = props => {
  if (!props.crumbs) {
    return <div className="bottomline"></div>
  }

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

  return (
    <div className={styles.breadcrumbs}>
      <div className={styles.centerpart}>
        <Breadcrumb
          crumbs={_crumbs}
          crumbSeparator=" "
          title=""
        />
        <div className={styles.nextline}></div>
      </div>
    </div>
  )
}

export default SuperCrumbs