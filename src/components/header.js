import React from "react"
import NavigationBar from "../components/navigationBar"

const Header = ({ title }) => (
  <header>
    <link href="https://fonts.googleapis.com/css2?family=Vollkorn+SC:wght@700&family=Manrope:wght@300&family=Nunito:wght@300&display=swap" rel="stylesheet"></link>
    <NavigationBar />
    <title>{title}</title>
  </header>
)

export default Header
