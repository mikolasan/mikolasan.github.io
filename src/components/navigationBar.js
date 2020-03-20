import React from "react"
import { Link } from "gatsby"

export default () => (
  <ul>
    <li><Link to="/everything">Всё</Link></li>
    <li><Link to="/science/">Наука</Link></li>
    <li><Link to="/projects/">Проекты</Link></li>
    <li><Link to="/gamedev/">Игры</Link></li>
  </ul>
)
