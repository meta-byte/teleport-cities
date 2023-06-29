import React, { Fragment } from "react";
import "./App.css";

import CitySelector from "./components/CitySelector";

function App() {
  return (
    <Fragment>
      <div className="container">
        <CitySelector />
      </div>
    </Fragment>
  );
}

export default App;
