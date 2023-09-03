import React from "react"

import MobileNav from "./mobileNav"
import Nav from "./nav"
import RuNav from "./ru/nav"

const Navbar = props => (
  <>
    <MobileNav {...props} />
    {props.language === "en" && 
      <Nav section={props.section} /> ||
        <RuNav section={props.section} />
    }
  </>
)

export default Navbar;
