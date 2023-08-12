import React from "react"

import MobileNav from "./mobileNav"
import Nav from "./nav"
import RuNav from "./ru/nav"

const Navbar = props => (
  <>
    <MobileNav {...props} />
    {props.language === "en" && 
      <Nav active={props.activeSection} /> ||
        <RuNav active={props.activeSection} />
    }
  </>
)

export default Navbar;
