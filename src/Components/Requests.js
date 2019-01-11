import React, { Component } from "react";
import db from "../data/db";
import { handleDataChange } from "../data/requestsApi";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");
class Requests extends Component {
  state = {
    filter: true,
    sort: "upvotes",
    dir_up_asc: true,
    dir_time_asc: true,
    requests: []
  };

  sortTime = () => {
    let requests;
    if (this.state.dir_time_asc) {
      requests = this.state.requests.sort((a, b) => {
        return a.timestamp < b.timestamp
          ? -1
          : a.timestamp > b.timestamp
          ? 1
          : 0;
      });
    } else {
      requests = this.state.requests.sort((a, b) => {
        return a.timestamp < b.timestamp
          ? 1
          : a.timestamp > b.timestamp
          ? -1
          : 0;
      });
    }
    this.setState({
      ...this.state,
      requests,
      dir_time_asc: !this.state.dir_time_asc
    });
  };
  sortUpvotes = () => {
    let requests;
    if (this.state.dir_up_asc) {
      requests = this.state.requests.sort((a, b) => {
        return a.upvotes < b.upvotes ? 1 : a.upvotes > b.upvotes ? -1 : 0;
      });
    } else {
      requests = this.state.requests.sort((a, b) => {
        return a.upvotes < b.upvotes ? -1 : a.upvotes > b.upvotes ? 1 : 0;
      });
    }
    this.setState({
      ...this.state,
      requests,
      dir_up_asc: !this.state.dir_up_asc
    });
  };
  filterReq = () => {
    this.setState({
      filter: !this.state.filter
    });
  };
  componentDidMount() {
    db.collection("Parties")
      .doc("hAlXTRnQLhPphs5OUsQ6")
      .collection("Requests")
      .onSnapshot(snapshot => {
        const requestData = handleDataChange(this.state.requests, snapshot);
        const requests = requestData.map(x => {
          const timestamp = x.time_added.toDate();
          return { ...x, timestamp };
        });
        this.setState({
          requests
        });
      });
  }
  markPlayed = id => {
    db.collection("Parties")
      .doc("hAlXTRnQLhPphs5OUsQ6")
      .collection("Requests")
      .doc(id)
      .update({
        played: true
      });
  };
  render() {
    return (
      <>
        <p>
          <span>Sort By:</span> <span onClick={this.sortUpvotes}>Upvotes</span>{" "}
          | <span onClick={this.sortTime}>Most Recent</span>
        </p>
        <p>
          <button onClick={() => this.filterReq()}>
            {this.state.filter ? "Show Played" : "Hide Played"}
          </button>
        </p>

        <ul>
          {this.state.requests
            .filter(x => !this.state.filter || !x.played)
            .map(({ id, title, artist, upvotes, played, timestamp }) => {
              return (
                <li key={id}>
                  <strong>
                    {title} - {artist} - {timeAgo.format(timestamp)}
                  </strong>
                  <ul>
                    <li>{upvotes}</li>
                    <li>
                      {played ? (
                        "Played"
                      ) : (
                        <button onClick={() => this.markPlayed(id)}>
                          Mark Played
                        </button>
                      )}
                    </li>
                  </ul>
                </li>
              );
            })}
        </ul>
      </>
    );
  }
}

export default Requests;
