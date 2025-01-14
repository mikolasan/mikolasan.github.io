import React from "react"

import NavigationBar from "./navigationBar"
import SubNav from "./subNav"

const Header = props => (
  <header>
    <NavigationBar {...props} />
    <SubNav {...props} />
  </header>
)

export default Header