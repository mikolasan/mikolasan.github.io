import React from "react"

import MobileNav from "./mobileNav"
import Nav from "./nav"

const Navbar = props => (
  <>
    <MobileNav {...props} />
    <Nav section={props.section} />
  </>
)

export default Navbar;
