/* tslint:disable */
import "./App.css";
import Callback from "./auth/Callback";
import Header from "./components/Header";
import { Slots } from "./components/Slots";
import { Slot } from "./generated/api"
import { FlowStep } from "./redux/helpers";

import * as React from "react";
import { Route, Switch } from "react-router";
import Auth from "./auth/Auth";
import Home from "./components/Home";
import { connect } from "react-redux";
import { Dispatch } from 'redux';
import * as authActions from "./redux/auth/authActions";
import * as lotteryActions from "./redux/lottery/lotteryActions";

import { StoreShape } from "./redux/shape/storeShape";
import { AuthShape } from "./redux/auth/authShape";

interface AppStateProps {
  authd: AuthShape;
  slots: Slot[];
  updateAuthd: (user: any) => void;
  loadLottery: () => void;
  selectSlot: (slotId: string) => void;
  isSelecting: boolean;
  selectedSlotId: string;
  className?: string;  
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

      // load lottery
      
      this.props.loadLottery();
    } else {
      this.props.updateAuthd({
        isAuthd: false
      });
    }
  }

  public render() {

    return (
      <div className={this.props.className}>
        <Header 
          authd={this.props.authd} 
          onLogin={this.onLogin} 
          onLogout={this.onLogout} />

        <Slots 
          slots={this.props.slots} 
          selectSlot={this.props.selectSlot}
          selectedSlotId={this.props.selectedSlotId}
          isSelecting={this.props.isSelecting} />

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
    authd: state.auth,
    slots: state.lottery && state.lottery.lottery && state.lottery.lottery.slots || [],
    selectedSlotId: state.lottery.selectedSlotId,
    isSelecting: state.lottery.selectSlotFlowStep === FlowStep.Started
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): any => {
  return {
    updateAuthd: (user) => dispatch(authActions.updateAuthd(user)),
    loadLottery: () => dispatch(lotteryActions.loadLotteryFlow.try()),
    selectSlot: (slotId) => dispatch(lotteryActions.selectSlot.try({slotId})),
  };
};

export const App = connect<any, any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(AppBase);
