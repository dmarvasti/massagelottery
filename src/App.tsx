/* tslint:disable */
import "./App.css";
import Callback from "./auth/Callback";

import * as React from "react";
import { Route, Switch } from "react-router";
import Auth from "./auth/Auth";
import Home from "./components/Home";
import { connect } from "react-redux";
import { Dispatch } from 'redux';
import * as authActions from "./redux/auth/authActions";
import { StoreShape } from "./redux/shape/storeShape";
import { AuthShape } from "./redux/auth/authShape";

interface AppStateProps {
  authd: AuthShape;
  updateAuthd: (user: any) => void;
}

// import { hot } from "react-hot-loader";
// import logo from './logo.svg';

const auth = new Auth();

const handleAuthentication = (props: any) => {
  if (/access_token|id_token|error/.test(props.location.hash)) {
    auth.handleAuthentication();
  }
}

class AppBase extends React.Component<AppStateProps> {
  public onLogin = (): void => {
    auth.login();
  }

  public onLogout = (): void => {
    auth.logout();
  }
  
  public componentDidMount() {
    if (auth.isAuthenticated()) {
      const user = auth.getUser();
      this.props.updateAuthd({
        user,
        isAuthd: true
      });
    } else {
      this.props.updateAuthd({
        isAuthd: false
      });
    }
  }

  public render() {

    return (
      <div>
        {
          this.props.authd.isAuthd ? (
            <div>
              Welcome {this.props.authd.user.name} <strong>{ this.props.authd.isAdmin ? `(Administrator)` : ``}</strong> <span onClick={this.onLogout}>(logout now)</span>
              <br/><img width="50" src={this.props.authd.user.picture} />
            </div>

          ) : (
            <div>
              Hi - please <span onClick={this.onLogin}>login</span>

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


const mapStateToProps = (state: StoreShape): any => {
  return {
    authd: state.auth
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): any => {
  return {
    updateAuthd: (user) => dispatch(authActions.updateAuthd(user)),
  };
};

export const App = connect<any, any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(AppBase);
