import React from "react"
import { Link } from "gatsby"

export default () => (
  <ul>
    <li><Link to="/">Всё</Link></li>
    <li><Link to="/science/">Наука</Link></li>
    <li><Link to="/projects/">Проекты</Link></li>
    <li><Link to="/games/">Игры</Link></li>
  </ul>
)
