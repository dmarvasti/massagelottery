/* tslint:disable */

import * as React from 'react';
import { AuthShape } from "../redux/auth/authShape";
import { Avatar } from 'antd';
import { Button, Layout } from 'antd';

// Redux provided props via mapStateToProps
interface HeaderProps {
  authd: AuthShape
  onLogin: () => void;
  onLogout: () => void;
  onExecuteLottery: () => void;  
}

const { Header } = Layout;

class LotteryHeader extends React.Component<HeaderProps> {
  public render() {
    return (
      <Header>
        {
          this.props.authd.isAuthd ? (
            <div>
              Welcome {this.props.authd.user.name} <strong>{ this.props.authd.isAdmin ? `(Administrator)` : ``}</strong> <span onClick={this.props.onLogout}>(logout now)</span>
              <Avatar size="large" src={this.props.authd.user.picture} />
            </div>

          ) : (
            <div>
              Hi - please <span onClick={this.props.onLogin}>login</span>
            </div>
          )
        }

        {
          this.props.authd.isAdmin && (
              <Button onClick={this.props.onExecuteLottery}>Execute Lottery</Button>
          )
        }
      </Header>
    );
  }
}

export default LotteryHeader;