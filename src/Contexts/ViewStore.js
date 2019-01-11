import React, { Component, createContext } from "react";
export const ViewContext = createContext();

class ViewStore extends Component {
  constructor() {
    super();
    this.state = {
      setParty: this.setParty,
      clearParty: this.clearParty,
      isParty: !!localStorage.getItem("partyName")
    };
  }
  clearParty = () => {
    localStorage.removeItem("partyName");
    this.setState({ isParty: false });
  };
  setParty = partyName => {
    localStorage.setItem("partyName", partyName);
    this.setState({ isParty: true });
  };
  render() {
    return (
      <ViewContext.Provider value={this.state}>
        {this.props.children}
      </ViewContext.Provider>
    );
  }
}

export default ViewStore;
