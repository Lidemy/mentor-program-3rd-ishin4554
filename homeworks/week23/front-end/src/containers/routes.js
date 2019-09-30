import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

// Component
import Article from "./article";
import Editor from "./editor";
import Posts from "./posts";
import Login from "./login";
import Register from "./register";

// Static
import About from "../components/about";

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/about' component={About} />
      <Route exact path='/login' component={Login} />
      <Route path='/post/:id' component={Article}/>
      <Route exact path='/:method/post/:id' component={Editor}/>
      <Route exact path='/:method/post' component={Editor}/>
      <Route exact path='/register' component={Register} />
      <Route exact path='/login' component={Login} />
      <Route path='/:category' component={Posts}/>

      {/* <Route path='/home' render={(props) => (
        <Home {...props} auth={auth} />
      )} />         */}
      {/* <Route path='/log' component={Log}></Route> */}
    </Switch>
  );
};

// const mapStateToProps = store => ({
//   user: store.auth.user
// });

export default withRouter(Routes);
