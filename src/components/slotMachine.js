import React from "react"
import { init_interface } from "./slots/interface"
import { init_reels } from "./slots/reels"
import "./slot.css"

class SlotMachine extends React.Component {
  componentDidMount() {
    init_reels();
    init_interface();
  }

  render() {
    return (
      <>
        <canvas id="reels" width="900" height="843"></canvas>
        <canvas id="interface" width="100" height="50"></canvas>
        <h2>Results</h2>
        <div id="slot-machine-result"><p>No results. Press "Spin" to get new ideas.</p></div>
      </>
    )
  }
}

export default SlotMachine