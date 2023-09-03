import React from "react"
import { Link } from "gatsby"

import * as styles from "./subNav.module.css"

const SubNav = props => {
  let list = <>
    <Link to="/make/robot">Robot</Link>
    <Link to="/make/3d-prints">3D prints</Link>

    <Link to="/ai">AI</Link>

    <Link to="/code/cpp">C++</Link>
    <Link to="/gamedev">Gamedev</Link>
    <Link to="/linux">Linux</Link>
    <Link to="/projects">Projects</Link>
    <Link to="/ideas">Ideas</Link>

    <Link to="/devlog">Devlog</Link>
    <Link to="/board-games">Board Games</Link>
    <Link to="/slots">Slots</Link>
    <Link to="/youtube">Vlog</Link>
  </>
  
  if (props.section === `make`) {
    list = <>
      <Link to="/make/robot">Robot</Link>
      <Link to="/make/3d-prints">3D prints</Link>
    </>
  } else if (props.section === `science`) {
    list = <>
      <Link to="/ai">AI</Link>
    </>
  } else if (props.section === `code`) {
    list = <>
      <Link to="/code/cpp">C++</Link>
      <Link to="/gamedev">Gamedev</Link>
      <Link to="/linux">Linux</Link>
      <Link to="/projects">Projects</Link>
      <Link to="/ideas">Ideas</Link>
    </>
  } else if (props.section === `blog`) {
    list = <>
      <Link to="/devlog">Devlog</Link>
      <Link to="/board-games">Board Games</Link>
      <Link to="/slots">Slots</Link>
      <Link to="/youtube">Vlog</Link>
    </>
  }
  return <div className={styles.subnav}>
    {list}
  </div>
}

export default SubNav