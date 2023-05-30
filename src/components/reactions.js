import PropTypes from "prop-types"
import React from "react"
import * as styles from "./reactions.module.css"

const serverUrl = "https://reactions-xn8g.onrender.com"

class Reactions extends React.Component {
  static propTypes = {
    slug: PropTypes.string.isRequired,
    errorCallback: PropTypes.func.isRequired
  }

  // heart clap 
  constructor(props) {
    super(props)
    this.sendReaction = this.sendReaction.bind(this)
    this.reactHeart = this.sendReaction.bind(this, "heart")
    this.reactExplodingHead = this.sendReaction.bind(this, "exploding-head")
    this.reactRaisedHands = this.sendReaction.bind(this, "raised-hands")
    this.reactFire = this.sendReaction.bind(this, "fire")
    this.reactUnicorn = this.sendReaction.bind(this, "unicorn")
    this.pageUrl = props.slug
    this.errorCallback = props.errorCallback
    this.state = {
      reactions: {
        "heart": 0,
        "exploding-head": 0,
        "raised-hands": 0,
        "fire": 0,
        "unicorn": 0
      },
      total: 0,
      message: ""
    }
  }

  zeroReactions() {
    const reactions = {...this.state.reactions}
    Object.entries(reactions).forEach(([name, reaction]) => {
      reactions[name] = 0
    })
    return reactions
  }

  setMessageAndCallback(message) {
    this.setState({
      message: message
    })
    this.errorCallback(message)
  }

  async componentDidMount() {
    const requestStartTime = Date.now()
    this.setMessageAndCallback("Sending request to web service on render.com. I'm using free plan, so be patient :)")  
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
    }
    try {
      const params = new URLSearchParams({
        url: this.pageUrl
      })
      const response = await fetch(serverUrl + "/reactions?" + params, requestOptions)
      if (!response.ok) {
        this.setMessageAndCallback(`RESPONSE is not OKAY AAAAAAAAAAAAAAAA ${response.statusText}`)  
        return
      }
      console.log(response);
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        this.setMessageAndCallback("Oops, we haven't got a JSON!");
      }

      const data = await response.json()
      if (!("reactions" in data) || data.reactions === null) {
        this.setMessageAndCallback("\u00A0");
        this.setState({
          reactions: this.zeroReactions(),
          total: 0
        })
        return
      }

      const reactions = this.zeroReactions()
      Object.entries(data.reactions).forEach(([name, reaction]) => {
        reactions[name] = reaction
      })
      const requestTime = Date.now() - requestStartTime
      this.setMessageAndCallback(`Reactions retrieved from Mongo DB and delivered by a Python service in ${Math.floor(requestTime / 1000)} msec`);
      this.setState({
        reactions: reactions,
        total: Object.values(reactions).reduce((a, b) => a + b, 0)
      })
    
    } catch (err) {
      if (err instanceof SyntaxError) {
        this.setMessageAndCallback(`I write very bad API: ${err}`)
      } else {
        this.setMessageAndCallback(`My dear friend! We have encountered this: ${err}`)
      }
    }
  }

  sendReaction(reactionName, e) {
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
        reaction: reactionName
      })
    }
    const self = this
    fetch(serverUrl + "/react", requestOptions)
      .then(response => response.json())
      .then(data => {
        const reactions = {...self.state.reactions}
        reactions[data.reactionName] = data.reaction
        self.setState({
          reactions: reactions,
          total: Object.values(reactions).reduce((a, b) => a + b, 0)
        })        
      })
      .catch(err => self.setMessageAndCallback(`My dear friend! We have encountered this: ${err}`))
  }

  render() {
    return (
      <section className={styles.reactions} aria-label="Page reactions">
        <ul>
          <li>
            <button onClick={this.reactHeart} aria-label="Heart">
              <img src="/images/reactions/heart_t.svg"  alt="heart reaction" />
              {` `}{this.state.reactions.heart}
            </button>
          </li>
          <li>
            <button onClick={this.reactExplodingHead} aria-label="Eploding Head">
              <img src="/images/reactions/exploding_head_t.svg" alt="exploding head reaction" />
              {` `}{this.state.reactions["exploding-head"]}</button>
          </li>
          <li>
            <button onClick={this.reactRaisedHands} aria-label="RaisedHands">
              <img src="/images/reactions/raising_hands_t.svg" alt="raised hands reaction" />
              {` `}{this.state.reactions["raised-hands"]}</button>
          </li>
          <li>
            <button onClick={this.reactFire} aria-label="Fire">
              <img src="/images/reactions/fire_t.svg" alt="fire reaction" />
              {` `}{this.state.reactions.fire}</button>
          </li>
          <li>
            <button onClick={this.reactUnicorn} aria-label="Unicorn">
              <img src="/images/reactions/unicorn_t.svg" alt="unicorn reaction" />
              {` `}{this.state.reactions.unicorn}</button>
          </li>
        </ul>
        <p>
          {this.state.message}
        </p>
      </section>
    )
  }
}

export default Reactions