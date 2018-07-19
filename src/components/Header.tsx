/* tslint:disable */

import * as React from 'react';
import { AuthShape } from "../redux/auth/authShape";
import { Avatar } from 'antd';

// Redux provided props via mapStateToProps
interface HeaderProps {
  authd: AuthShape
  onLogin: () => void;
  onLogout: () => void;
}


class Header extends React.Component<HeaderProps> {
  public render() {
    return (
      <div>
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
      </div>
    );
  }
}

export default Header;