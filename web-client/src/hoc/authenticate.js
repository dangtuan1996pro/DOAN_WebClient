import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { loginWithToken } from "../scenes/Auth/actions";
import select from "../util/selector";

import ROUTER from "../constants/router";

const WithAuthenticationHOC = needAuthenticated => WrappedComponent => {
  class Authentication extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      if (!nextProps.isAuthenticated) {
        if (localStorage.getItem("jwt") !== null) {
          nextProps.loginWithToken(nextProps.location);
        }
      }
      return prevState;
    }

    render() {
      const { isAuthenticated } = this.props;
      return !isAuthenticated && needAuthenticated ? (
        <Redirect to={ROUTER.AUTH.LOGIN} />
      ) : (
        <WrappedComponent {...this.props} />
      );
    }
  }

  const mapStateToProps = state => ({
    isAuthenticated: select(state, "authReducer", "isAuthenticated"),
  });

  const mapDispatchToProps = dispatch => ({
    loginWithToken: location => dispatch(loginWithToken(location)),
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Authentication);
};

export default WithAuthenticationHOC;
