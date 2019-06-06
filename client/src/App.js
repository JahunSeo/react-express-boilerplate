import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Thread from "./Page/Thread";

import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>thread your beads</h1>
      <Router>
        <Route path="/" exact component={Thread} />
        <Route path="/vertices/:id" component={Thread} />
      </Router>
    </div>
  );
}

export default App;
