import React from "react";
import { connect } from 'react-redux';
import { Actions } from "../actions";
import Login from '../components/login';

const LoginContainer = props => <Login {...props} />;

const mapDispatchToProps = {
  login: Actions.LOGIN
}

export default connect(null, mapDispatchToProps)(LoginContainer)