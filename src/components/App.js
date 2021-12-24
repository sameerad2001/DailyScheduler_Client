import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Navbar from "./Navbar"
import Home from "./Home";
import Footer from "./Footer";
import Schedules from "./Schedules";

function App() {
  return (
    <div className="App">

      <Router>

        <Navbar />

        <Switch>

          <Route path="/" exact>
            <Home />
          </Route>

          <Route path="/schedules" exact>
            <Schedules />
          </Route>

        </Switch>

      </Router>


      <Footer />

    </div>
  );
}

export default App;
