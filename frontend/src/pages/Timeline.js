import React, { Component } from "react";
import api from "../services/api";
import socket from "socket.io-client";

import twitterLogo from "../twitter.svg";
import "./Timeline.css";

import Tweet from "../components/Tweet";

export default class Timeline extends Component {
  state = {
    tweets: [],
    newTweet: "",
  };

  async componentDidMount() {
    const user = localStorage.getItem("@GoTwitter:username");
    if (!user.length) this.handleLogout();
    this.subscribeToEvents();
    const { data: tweets } = await api.get("tweets");
    this.setState({ tweets });
  }

  handleNewTweet = async (e) => {
    const content = this.state.newTweet;
    if (e.keyCode !== 13 || content.trim() === "") return;
    e.preventDefault();

    const author = localStorage.getItem("@GoTwitter:username");

    await api.post("tweets", { content, author });
    this.setState({ newTweet: "" });
  };

  handleInputChange = (e) => {
    this.setState({ newTweet: e.target.value });
  };

  subscribeToEvents = () => {
    const io = socket(process.env.REACT_APP_API_URL);
    io.on("tweet", (data) => {
      this.setState({ tweets: [data, ...this.state.tweets] });
    });
    io.on("like", (data) => {
      this.setState({
        tweets: this.state.tweets.map((tweet) =>
          tweet._id === data._id ? data : tweet
        ),
      });
    });
  };

  handleLogout = () => {
    localStorage.setItem("@GoTwitter:username", "");
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="timeline-wrapper">
        <div className="timeline-header">
          <button onClick={this.handleLogout}>Logout</button>
          <img src={twitterLogo} height={24} alt="GoTwitter" />
        </div>
        <form>
          <textarea
            value={this.state.newTweet}
            onChange={this.handleInputChange}
            onKeyDown={this.handleNewTweet}
            placeholder="What's happening?"
          ></textarea>
        </form>
        <ul className="tweet-list">
          {this.state.tweets.map((tweet) => (
            <Tweet key={tweet._id} tweet={tweet} />
          ))}
        </ul>
      </div>
    );
  }
}
