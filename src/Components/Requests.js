import React, { Component } from "react";
import { RequestsContext } from "../Contexts/RequestsStore";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import moment from "moment";
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");
class Requests extends Component {
  state = { filter: false, sort: "upvotes" };

  sortReq = field => {
    this.setState({
      sort: field
    });
  };
  filterReq = () => {
    this.setState({
      filter: !this.state.filter
    });
  };
  render() {
    return (
      <>
        <p>
          <span>Sort By:</span>{" "}
          <span onClick={() => this.sortReq("upvotes")}>Upvotes</span> |{" "}
          <span onClick={() => this.sortReq("timestamp")}>Most Recent</span>
        </p>
        <p>
          <button onClick={() => this.filterReq()}>
            {this.state.filter ? "Show Played" : "Hide Played"}
          </button>
        </p>
        <RequestsContext.Consumer>
          {({ requests, markPlayed }) => (
            <ul>
              {requests &&
                requests
                  .filter(x => !this.state.filter || !x.played)
                  .sort((a, b) => {
                    return a[this.state.sort] < b[this.state.sort]
                      ? -1
                      : a[this.state.sort] > b[this.state.sort]
                        ? 1
                        : 0;
                  })
                  .map(
                    ({
                      id,
                      title,
                      artist,
                      upvotes,
                      played,
                      time_added: timestamp
                    }) => {
                      // console.log(timestamp);
                      console.log(
                        moment(timestamp.seconds).format("MM-DD-YYYY")
                      );
                      return (
                        <li key={id}>
                          <strong>
                            {title} - {artist} -{" "}
                            {timeAgo.format(
                              new Date(1970, 0, 1).setSeconds(timestamp.seconds)
                            )}
                          </strong>
                          <ul>
                            <li>{upvotes}</li>
                            <li>
                              {played ? "true" : "false"} -{" "}
                              <button onClick={() => markPlayed(id)}>
                                Mark Played
                              </button>
                            </li>
                          </ul>
                        </li>
                      );
                    }
                  )}
            </ul>
          )}
        </RequestsContext.Consumer>
      </>
    );
  }
}

export default Requests;
