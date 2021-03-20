import React, { createContext, useState } from "react";
import './App.css';
import Header from './Components/Header/Header';
import Home from "./Components/Home/Home";
import RideDestination from "./Components/RideDestination/RideDestination";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import NotFound from "./Components/NotFound/NotFound";
import Login from "./Components/Login/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser ] = useState({})
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute path="/destination/:ride">
            <RideDestination />
          </PrivateRoute>
          <PrivateRoute path="/destination">
            <Home />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
