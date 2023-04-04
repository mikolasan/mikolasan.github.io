import React from "react"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"
import NavigationBar from "../components/navigationBar"
import * as styles from "./header.module.css"

const Header = ({
  crumbs,
  language,
  menuClickedCallback,
  section
}) => {
  const crumbsLine = crumbs && (
    <div className={styles.breadcrumbs}>
      <div className={styles.centerpart}>
        <Breadcrumb
          crumbs={crumbs}
          crumbSeparator=" "
          title={<img src="/images/pagoda.svg" className={styles.titleimg} />}
        />
        <div className={styles.nextline}></div>
      </div>
    </div>
  ) || (
    <div className="bottomline"></div>
  )

  return (
    <header>
      <NavigationBar 
        active={section}
        language={language}
        menuClickedCallback={menuClickedCallback}
      />
      {crumbsLine}
    </header>
  )
}

export default Header