import React from "react"
import { initGame } from "./snake/game"
import * as styles from "./snake.module.css"

class Snake extends React.Component {
  componentDidMount() {
    initGame()
  }

  render() {
    return (
      <canvas id="snake" className={styles.snake} tabindex="1"></canvas>
    )
  }
}

export default Snake