import React from "react"
import { init_interface } from "./slots/interface"
import { init_reels } from "./slots/reels"
import * as styles from "./slotMachine.module.css"

class SlotMachine extends React.Component {
  componentDidMount() {
    init_reels();
    init_interface();
  }

  render() {
    return (
      <div className={styles.generator}>
        <canvas className={styles.slotmachine} id="reels"></canvas>
        <canvas className={styles.slotmachine} id="ui"></canvas>
        <h2>Results</h2>
        <div id="slot-machine-result"><p>No results. Press "Spin" to get new ideas.</p></div>
      </div>
    )
  }
}

export default SlotMachine