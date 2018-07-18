/* tslint:disable */
import "./App.css";
import Callback from "./auth/Callback";

import * as React from "react";
import { Route, Switch } from "react-router";
import Auth from "./auth/Auth";
import Home from "./components/Home";

// import { hot } from "react-hot-loader";
// import logo from './logo.svg';

const auth = new Auth();

const handleAuthentication = (props: any) => {
  if (/access_token|id_token|error/.test(props.location.hash)) {
    auth.handleAuthentication();
  }
}

class App extends React.Component {
  public onLogin = (): void => {
    auth.login();
  }

  public onLogout = (): void => {
    auth.logout();
  }
  
  public render() {
    const isAuthd = auth.isAuthenticated();

    return (
      <div>
        Welcome you are 
        {
          isAuthd ? (
            <div>logged in <span onClick={this.onLogout}>(logout now)</span></div>
          ) : (
            <div>
              logged out <span onClick={this.onLogin}>login</span>

            </div>
          )
        }

        <Switch>
          <Route exact path="/home"  component={Home} />
          <Route exact path="/callback"  render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} />
          }} />
        </Switch>
      </div>
    );
  }
}

export default App;
