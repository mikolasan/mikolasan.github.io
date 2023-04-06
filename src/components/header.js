import React from "react"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"
import NavigationBar from "../components/navigationBar"
import * as styles from "./header.module.css"

const Header = ({
  crumbs,
  language,
  menuOpen,
  menuClickedCallback,
  section
}) => {
  // TODO:
  // if (crumbs && language !== "en") {
  //   const root = crumbs.shift(); // remove the first element
  //   if (crumbs.length > 0) {
  //     // update the crumb label, keep `pathname`
  //     crumbs[0].crumbLabel = root.crumbLabel
  //   }
  // }
  const crumbsLine = crumbs && (
    <div className={styles.breadcrumbs}>
      <div className={styles.centerpart}>
        <Breadcrumb
          crumbs={crumbs}
          crumbSeparator=" "
          title={<p className={styles.titleimg}>N</p>}
        />
        <div className={styles.nextline}></div>
      </div>
    </div>
  ) || (
    <div className="bottomline"></div>
  )

  // console.log("crumbs", crumbs)
  return (
    <header>
      <NavigationBar 
        active={section}
        language={language}
        menuOpen={menuOpen}
        menuClickedCallback={menuClickedCallback}
      />
      {crumbsLine}
    </header>
  )
}

export default Header