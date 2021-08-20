import React from "react";
import {Route, Switch} from "react-router";

import Header from "./components/header";
import Login from "./components/login";
import Register from "./components/register";
import ExpenditurePage from "./components/expensesPage";
import Logout from "./components/logout";

const App = props => {
  return (
      <>
          <Header/>
          <Switch>
              <Route path="/expenditures">
                <ExpenditurePage/>
              </Route>
              <Route path="/register">
                <Register/>
              </Route>
              <Route path="/logout">
                  <Logout/>
              </Route>
              <Route path="/" render={(props) => <Login {...props}/>}/>
          </Switch>
      </>
  );
}

export default App
