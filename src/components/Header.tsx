/* tslint:disable */

import * as React from 'react';
import { AuthShape } from "../redux/auth/authShape";
import { Avatar } from 'antd';
import { Button, Layout, Row, Col } from 'antd';
import Media from "react-media";

// Redux provided props via mapStateToProps
interface HeaderProps {
  authd: AuthShape
  giphy: any;
  onLogin: () => void;
  onLogout: () => void;
  onExecuteLottery: () => void;  
}

const { Header } = Layout;

class LotteryHeader extends React.Component<HeaderProps> {
  public render() {
    return (
      <div>

        <Row type="flex" justify="center" className={"splash"}>
          <Col xs={24} md={14}>
            {
              this.props.authd.isAuthd && (
                <Avatar size="large" src={this.props.authd.user.picture} />
              )
            }

            <h1>Massage Lottery</h1>
           
            {
              !this.props.authd.isAuthd ? (
                <div>
                  <Button type="primary" icon="login" onClick={this.props.onLogin}>Login</Button><br/><br/>

                  <Media query={{ maxWidth: 599 }}>
                    {matches =>
                      matches && this.props.giphy ? (
                        <img src={this.props.giphy.fixed_width_downsampled_url} />
                        
                      ) : (
                        <img src={this.props.giphy.image_url} />
                      )
                    }
                  </Media>

                </div>
              ) : (
                <div>
                  <Media query={{ maxWidth: 599 }}>
                    {matches =>
                      matches && this.props.giphy ? (
                        <img src={this.props.giphy.fixed_width_downsampled_url} />
                        
                      ) : (
                        <img src={this.props.giphy ? this.props.giphy.fixed_height_downsampled_url : ""} />
                      )
                    }
                  </Media>
                </div>  
              )
            }
          </Col>
        </Row>

        <Row type="flex" justify="center" className={"splash"}>
          <Col xs={24}>
            {
              this.props.authd.isAuthd && (
                <div>
                  <Button type="primary" icon="logout" onClick={this.props.onLogout}>Logout</Button>               
                  {
                    this.props.authd.isAdmin && (
                      <Button type="danger" icon="notification" onClick={this.props.onExecuteLottery}>Execute Lottery</Button>
                    )
                  }
                </div>  
              ) 
            }
          </Col>
        </Row>
      </div>
    );
  }
}

export default LotteryHeader;