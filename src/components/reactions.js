import PropTypes from "prop-types"
import React from "react"
import { Location } from "@reach/router"
import * as styles from "./reactions.module.css"

const serverUrl = "https://like-mikolasan.herokuapp.com"

class Reactions extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    errorCallback: PropTypes.func.isRequired
  }

  // https://emojipedia.org/exploding-head/
  // https://emojipedia.org/zany-face/
  // https://emojipedia.org/confused-face/
  // https://emojipedia.org/yawning-face/

  constructor (props) {
    super(props)
    this.likeClicked = this.likeClicked.bind(this)
    this.pageUrl = props.location.pathname
    this.errorCallback = props.errorCallback
    this.state = {
      scores: {
        "mind-blown": 0,
        wild: 0,
        confused: 0,
        boring: 0
      }
    }
  }

  async componentDidMount () {
    this.errorCallback("Sending request to free Heroku dyno, be patient :)")  
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }
    try {
      const params = new URLSearchParams({
        url: this.pageUrl
      })
      const response = await fetch(serverUrl + "/likes?" + params, requestOptions)
      if (!response.ok) {
        this.errorCallback(`RESPONSE is not OKAY AAAAAAAAAAAAAAAA ${response.statusText}`)  
        return
      }
      console.log(response);
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        this.errorCallback("Oops, we haven't got JSON!");
      }
      // if (!response.bodyUsed) {
      //   this.errorCallback("This page has never been scored. Be the first one!")
      //   return
      // }

      const data = await response.json()
      if (!("scores" in data) || data.scores === null) {
        this.errorCallback("no SCORES. Whyyyyyyyyyyyyyyy?")  
        return
      }
      
      const scores = {...this.state.scores}
      Object.entries(data.scores).forEach(([name, score]) => {
        scores[name] = score
      })
      this.setState({
        scores: scores
      })
    
    } catch (err) {
      if (err instanceof SyntaxError) {
        this.errorCallback(`I write very bad API: ${err}`)
      } else {
        this.errorCallback(`My dear friend! We have encountered this: ${err}`)
      }
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
    const self = this
    fetch(serverUrl + "/like", requestOptions)
      .then(response => response.json())
      .then(data => {
        const scores = {...self.scores}
        scores[data.scoreName] = data.score
        self.setState({
          scores: scores
        })        
      })
      .catch(err => self.errorCallback(`My dear friend! We have encountered this: ${err}`))
  }

  render () {
    const total = Object.values(this.state.scores).reduce((a, b) => a + b, 0)
    return (
      <section className={styles.reactions}>
        <h3>Page reactions</h3>
        <ul>
          <li onClick={this.likeClicked.bind(this, "mind-blown")}>🤯 {this.state.scores["mind-blown"]}</li>
          <li onClick={this.likeClicked.bind(this, "wild")}>🤪 {this.state.scores.wild}</li>
          <li onClick={this.likeClicked.bind(this, "confused")}>😕 {this.state.scores.confused}</li>
          <li onClick={this.likeClicked.bind(this, "boring")}>🥱 {this.state.scores.boring}</li>
        </ul>
        <p>Total votes: {total}</p>
      </section>
    )
  }
}

export default props => (
  <Location>
    {locationProps => <Reactions {...locationProps} {...props} />}
  </Location>
)