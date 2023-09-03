import React from "react"

import NavigationBar from "./navigationBar"
import SuperCrumbs from "./superCrumbs"
import SubNav from "./subNav"

const Header = props => (
  <header>
    <NavigationBar {...props} />
    <SubNav {...props} />
    {/* <SuperCrumbs 
      crumbs={props.crumbs} 
      language={props.language}
    /> */}
  </header>
)

export default Header