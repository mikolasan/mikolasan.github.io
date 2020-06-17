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
        <canvas id="reels" width="650" height="394"></canvas>
        <canvas id="interface" width="100" height="50"></canvas>
      </>
    )
  }
}

export default SlotMachine