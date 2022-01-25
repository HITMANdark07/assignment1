import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Assignment1 from "./Pages/Assignment1";
import Assignment2 from "./Pages/Assignment2";

function App() {
  
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Assignment1} />
        <Route path="/signup" exact component={Assignment2} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
