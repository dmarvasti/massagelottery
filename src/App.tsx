/* tslint:disable */
import "./App.css";
import Callback from "./auth/Callback";
import LotteryHeader from "./components/Header";
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
import { Button, Layout, Row, Col } from "antd";
import * as fetch from "isomorphic-fetch";
import styled from "styled-components";
import Media from "react-media";
import * as includes from "lodash.includes";

const { Content } = Layout;

interface AppStateProps {
  authd: AuthShape;
  slots: Slot[];
  updateAuthd: (user: any) => void;
  loadLottery: () => void;
  loadExecuteLottery: () => void;
  startLotteryPolling: () => void;
  selectSlot: (slotId: string) => void;
  isSelecting: boolean;
  isFinished: boolean;
  selectedSlotId: string;
  className?: string;  
}

interface AppState {
  giphy: any;
}

// import { hot } from "react-hot-loader";
// import logo from './logo.svg';

const auth = new Auth();

const handleAuthentication = (props: any) => {
  if (/access_token|id_token|error/.test(props.location.hash)) {
    auth.handleAuthentication();
  }
}

class AppBase extends React.Component<AppStateProps, AppState> {
  
  constructor(props) {
    super(props)
    
    this.state = {
      giphy: {},
    }
   
  }
  
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

      // start polling
      this.props.startLotteryPolling();
    } else {
      this.props.updateAuthd({
        isAuthd: false
      });
    }

    this.getMassageGif().then((response) => {
      this.setState({
        giphy: response.data        
      })
    })
  }

  public componentDidUpdate() {
    this.getIsWinnerStatus();
  }

  public render() {

    return (
      <div className={this.props.className}>
        <LotteryHeader 
          authd={this.props.authd} 
          giphy={this.state.giphy}
          onLogin={this.onLogin} 
          onLogout={this.onLogout}
          onExecuteLottery={this.props.loadExecuteLottery} 
          isFinished={this.props.isFinished}
          getIsWinnerStatus={this.getIsWinnerStatus}
          />

        <Content>
          {
            this.props.slots.length > 0 && (
              <Slots 
                slots={this.props.slots} 
                selectSlot={this.props.selectSlot}
                selectedSlotId={this.props.selectedSlotId}
                isSelecting={this.props.isSelecting} 
                isFinished={this.props.isFinished}
                isAdmin={this.props.authd.isAdmin}
                authd={this.props.authd}                 
                />
            )
          }
        </Content>  

        <Switch>
          <Route exact path="/callback"  render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} />
          }} />
        </Switch>
      </div>
    );
  }

  private getMassageGif = (): Promise<any> => {
    return fetch('http://api.giphy.com/v1/gifs/random?api_key=527dd91de16a417b9c556d4e1f371bb2&tag=massage')
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
  }

  public getIsWinnerStatus = (): boolean => {
    if (this.props.authd && this.props.isFinished && this.props.slots.length > 0) {
      const winners = this.props.slots.map((slot: Slot) => {
        return slot.winner;
      })

      return includes(winners, this.props.authd.user.name);    
    } else {
      return false;
    }
  }
} 

const mapStateToProps = (state: StoreShape): any => {
  return {
    authd: state.auth,
    slots: state.lottery && state.lottery.lottery && state.lottery.lottery.slots || [],
    selectedSlotId: state.lottery.selectedSlotId,
    isSelecting: state.lottery.selectSlotFlowStep === FlowStep.Started,
    isFinished:  state.lottery && state.lottery.lottery && state.lottery.lottery.isFinished
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): any => {
  return {
    updateAuthd: (user) => dispatch(authActions.updateAuthd(user)),
    loadLottery: () => dispatch(lotteryActions.loadLotteryFlow.try()),
    loadExecuteLottery: () => dispatch(lotteryActions.loadExecuteLotteryFlow.try()),
    startLotteryPolling: () => dispatch(lotteryActions.startLotteryPolling()),
    selectSlot: (slotId) => dispatch(lotteryActions.selectSlot.try({slotId})),
  };
};

export const AppConnected = connect<any, any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(AppBase);

export const App = styled(AppConnected)`
  .splash {
    padding: 10px 20px;
    text-align: center;

    button + button {
      margin-left: 10px;
    }
  }
`