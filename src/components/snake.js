import React from "react"
import { initSnake } from "./snake/game"
import * as styles from "./snake.module.css"

class Snake extends React.Component {
  componentDidMount() {
    initSnake()
  }

  render() {
    return (
      <canvas id="snake" className={styles.snake}></canvas>
    )
  }
}

export default Snake