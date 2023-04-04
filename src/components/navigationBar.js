import React from "react"

import MobileNav from "./mobileNav"
import Nav from "./nav"
import RuNav from "./ruNav"

const Navbar = ({ active, language, menuClickedCallback }) => (
  <>
    <MobileNav menuClickedCallback={menuClickedCallback} />
    {language === "en" && 
      <Nav active={active} /> || 
      <RuNav active={active} />
    }
  </>
)

export default Navbar;
