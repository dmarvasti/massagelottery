/* tslint:disable */

import * as React from 'react';
import { AuthShape } from "../redux/auth/authShape";
import { Avatar } from 'antd';
import { Button, Layout, Row, Col, Tag } from 'antd';
import Media from "react-media";
import styled from "styled-components";

// Redux provided props via mapStateToProps
interface HeaderProps {
  authd: AuthShape
  giphy: any;
  isFinished: boolean;
  className?: string;
  onLogin: () => void;
  onLogout: () => void;
  onExecuteLottery: () => void;  
}

const { Header } = Layout;

class LotteryHeaderBase extends React.Component<HeaderProps> {
  public render() {
    return (
      <div className={this.props.className}>
        {
          this.props.authd.isAuthd && (
            <Avatar size="large" src={this.props.authd.user.picture} />
          )
        }

        <Row type="flex" justify="center" className={"splash"}>
          <Col xs={24} md={this.props.authd.isAuthd ? 14 : 24}>
            <h1>
              Massage Lottery 
              {
                this.props.isFinished && <Tag color="red">Lottery Closed</Tag>
              }
            </h1>
           
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
                    this.props.authd.isAdmin && !this.props.isFinished && (
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

export default styled(LotteryHeaderBase)`
  .ant-avatar {
    position: absolute;
    top: 10px;
    right: 10px;

    @media (max-width: 500px) {
      height: 25px;
      width: 25px;
      top: 15px;
    }
  }

  h1 {
    .ant-tag {
      margin-left: 5px;
    }
  }

  @media (max-width: 500px) {
    h1 {
      font-size: 1.5em;
    }
  }
`