import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Card } from 'antd';
import LoginForm from './components/LoginForm';

import WithLoadingHOC from '../../hoc/loading';

class LoginWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      error: nextProps.error,
    };
  }

    removeError = () => {
      this.setState(() => ({
        error: false,
      }));
    };

    render() {
      const { doLogin } = this.props;
      const { error } = this.state;
      return (
        <Card
          hoverable
          style={{
            maxWidth: '100%',
            margin: 10,
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            cursor: 'pointer',
          }}
        >
          <LoginForm error={error} onSubmit={values => doLogin(values)} removeError={() => this.removeError()} />
        </Card>
      );
    }
}

LoginWrapper.propTypes = {
  doLogin: PropTypes.func.isRequired,
};

export default WithLoadingHOC(LoginWrapper);
