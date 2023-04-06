import React from "react"
import Footer from "./footer"
import RuFooter from "./ruFooter"

const FooterBase = ({ language }) => {
  return language === "en" && (
    <Footer />
  ) || (
    <RuFooter />
  )
}

export default FooterBase;