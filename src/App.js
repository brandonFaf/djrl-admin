import React from "react";
import "./App.css";
import Requests from "./Components/Requests";
import { ViewContext } from "./Contexts/ViewStore";
import RequestStore from "./Contexts/RequestsStore";
import SelectParty from "./Components/SelectParty";
const App = () => {
  return (
    <div>
      <ViewContext.Consumer>
        {({ isParty, clearParty, setParty }) =>
          isParty ? (
            <RequestStore>
              <Requests clearParty={clearParty} />
            </RequestStore>
          ) : (
            <SelectParty setParty={setParty} />
          )
        }
      </ViewContext.Consumer>
    </div>
  );
};

export default App;
