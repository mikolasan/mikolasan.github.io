import React from "react"

import MobileNav from "./mobileNav"
import Nav from "./nav"
import RuNav from "./ruNav"

const Navbar = ({ active, language, menuOpen, menuClickedCallback }) => (
  <>
    <MobileNav 
      menuOpen={menuOpen}
      menuClickedCallback={menuClickedCallback}
    />
    {language === "en" && 
      <Nav active={active} /> || 
      <RuNav active={active} />
    }
  </>
)

export default Navbar;
