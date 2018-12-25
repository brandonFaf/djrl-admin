import React, { Component, createContext } from "react";
import db from "../data/db";
import { handleDataChange } from "../data/requestsApi";
export const RequestsContext = createContext();

class RequestStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: []
    };
    this.requestsCollection = db
      .collection("Parties")
      .doc("hAlXTRnQLhPphs5OUsQ6")
      .collection("Requests");
  }

  componentDidMount() {
    db.collection("Parties")
      .doc("hAlXTRnQLhPphs5OUsQ6")
      .collection("Requests")
      .onSnapshot(snapshot => {
        const requestData = handleDataChange(this.state.requests, snapshot);
        const requests = requestData.map(x => {
          const timestamp = new Date(1970, 0, 1).setSeconds(
            x.time_added.seconds
          );
          return { ...x, timestamp };
        });
        this.setState({
          requests,
          markPlayed: id => this.markPlayed(id)
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
      <RequestsContext.Provider value={this.state}>
        {this.props.children}
      </RequestsContext.Provider>
    );
  }
}

export default RequestStore;
