import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import AppLayout from "./scenes/AppLayout";
import AuthLayout from "./scenes/Auth";

import ROUTER from "./constants/router";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact={true} path={ROUTER.AUTH.LOGIN} component={AuthLayout} />
        <Route path={ROUTER.HOME} component={AppLayout} />
      </Switch>
    );
  }
}

export default withRouter(App);
