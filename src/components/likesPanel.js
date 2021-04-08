import PropTypes from "prop-types"
import React from "react"
import { Location } from "@reach/router"

class LikesPanel extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  }

  // https://emojipedia.org/exploding-head/
  // https://emojipedia.org/zany-face/
  // https://emojipedia.org/confused-face/
  // https://emojipedia.org/yawning-face/

  scores = {
    "mind-blown": 0,
    wild: 0,
    confused: 0,
    boring: 0
  }

  constructor (props) {
    super(props)
    this.likeClicked = this.likeClicked.bind(this)
    this.pageUrl = props.location.pathname
    this.serverUrl = "https://like-mikolasan.herokuapp.com"
  }

  async componentDidMount () {
    const requestOptions = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }
    try {
      const response = await fetch(this.serverUrl + "/likes?" + new URLSearchParams({
        url: this.pageUrl
      }), requestOptions)
      if (!response.bodyUsed) return

      const data = await response.json()
      if (data.scores === null) return
      
      Object.entries(data.scores).forEach(([name, score]) => {
        this.scores[name] = score
      })
      this.forceUpdate()
    } catch (err) {
      console.error(err)
    }
  }

  likeClicked (scoreName, e) {
    e.preventDefault()
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        url: this.pageUrl,
        like: scoreName
      })
    }
    fetch(this.serverUrl + "/like", requestOptions)
      .then(response => response.json())
      .then(data => {
        this.scores[data.scoreName] = data.score
        this.forceUpdate()
      })
      .catch(err => console.error(err))
  }

  render () {
    const total = Object.values(this.scores).reduce((a, b) => a + b, 0)
    return (
      <>
        <hr />
        <h2>Page rating</h2>
        <p>
          Voted as 🤯🤪😕🥱 {total}
        </p>
        <h3>Cast your vote</h3>
        <ul>
          <li>🤯 {this.scores["mind-blown"]}  <button onClick={this.likeClicked.bind(this, "mind-blown")}>+1</button></li>
          <li>🤪 {this.scores.wild}  <button onClick={this.likeClicked.bind(this, "wild")}>+1</button></li>
          <li>😕 {this.scores.confused}  <button onClick={this.likeClicked.bind(this, "confused")}>+1</button></li>
          <li>🥱 {this.scores.boring}  <button onClick={this.likeClicked.bind(this, "boring")}>+1</button></li>
        </ul>
      </>
    )
  }
}

export default props => (
  <Location>
    {locationProps => <LikesPanel {...locationProps} {...props} />}
  </Location>
)
