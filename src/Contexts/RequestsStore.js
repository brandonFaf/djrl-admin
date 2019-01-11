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
  }

  componentDidMount() {
    const partyName = localStorage.getItem("partyName");
    db.collection("Parties")
      .doc(partyName)
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
    const partyName = localStorage.getItem("partyName");
    db.collection("Parties")
      .doc(partyName)
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
