import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

// Component
import Article from "./article";
import Editor from "./editor";
import Posts from "./posts";
import Login from "./login";
import Logs from "./logs";

// Static
import About from "../components/about";
import Home from "../components/home";


const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/about' component={About} />
      <Route exact path='/login' component={Login} />
      <Route path='/post/:id' component={Article}/>
      <Route exact path='/:method/post/:id' component={Editor}/>
      <Route exact path='/:method/post' component={Editor}/>
      <Route exact path='/login' component={Login} />
      <Route exact path='/log' component={Logs} />
      <Route path='/:category' component={Posts}/>
    </Switch>
  );
};

export default withRouter(Routes);
