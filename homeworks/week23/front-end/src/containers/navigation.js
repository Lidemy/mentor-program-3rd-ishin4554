import {connect} from 'react-redux';
import { Actions } from "../actions";
import Navigation from '../components/navigation';

const mapStateToProps = store => ({
  isLogin: store.user.isLogin
}) 

const mapDispatchToProps = {
  logout: Actions.LOGOUT
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)