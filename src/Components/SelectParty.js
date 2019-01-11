import React, { Component } from "react";
import db from "../data/db";

class SelectParty extends Component {
  constructor() {
    super();
    this.state = { hideForm: true };
    this.partyName = React.createRef();
  }
  componentDidMount() {
    db.collection("Parties")
      .get()
      .then(snapshot => {
        const parties = snapshot.docs.map(doc => doc.id);
        this.setState({
          parties
        });
      });
  }
  toggleForm = () => {
    this.setState({ hideForm: !this.state.hideForm });
  };
  createParty = () => {
    const partyName = this.partyName.current.value;
    db.collection("Parties")
      .doc(partyName)
      .set({})
      .then(doc => {
        this.partyName.current.value = "";
        this.setState({
          parties: [...this.state.parties, partyName],
          hideForm: true
        });
      });
  };
  render() {
    return (
      <div>
        <ul>
          {this.state.parties &&
            this.state.parties.map(partyName => {
              return (
                <li
                  key={partyName}
                  onClick={() => this.props.setParty(partyName)}
                >
                  {partyName}
                </li>
              );
            })}
        </ul>
        <div>
          <button onClick={this.toggleForm}>
            {this.state.hideForm ? "Create New Party" : "Cancel"}
          </button>
          {!this.state.hideForm && (
            <>
              <input type="text" ref={this.partyName} />
              <button onClick={this.createParty}>Submit</button>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default SelectParty;
