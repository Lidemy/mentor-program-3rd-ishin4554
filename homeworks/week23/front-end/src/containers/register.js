import React from "react";
import { connect } from 'react-redux';
import { Actions } from "../actions";
import Register from '../components/register';

const RegisterContainer = props => <Register {...props} />;

const mapDispatchToProps = {
  register: Actions.REGISTER
}

export default connect(null, mapDispatchToProps)(RegisterContainer)