import React from "react"
import { Link } from "gatsby"
import NavigationBar from "../components/navigationBar"

const Header = () => (
  <header>
    <div>
      <h1>
        <Link to="/">Nikolay Neupokoev</Link>
      </h1>
      <p>developer • traveler • snob</p>
    </div>
    <NavigationBar />
  </header>
)

export default Header
