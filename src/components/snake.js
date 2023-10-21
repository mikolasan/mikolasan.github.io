import React from "react"
import { initGame } from "./snake/game"
import * as styles from "./snake.module.css"

class Snake extends React.Component {
  componentDidMount() {
    initGame()
  }

  render() {
    return (
      <>
        <canvas id="snake" className={styles.snake} tabIndex="0"></canvas>
        <p>
          Tileset: <a href="https://artyom-zagorskiy.itch.io/isometric-medieval-pack" target="_blank" rel="external nofollow noopener noreferrer">
            Isometric Medieval Pack</a> by Artyom Zagorskiy.
        </p>
        <hr />
      </>
    )
  }
}

export default Snake