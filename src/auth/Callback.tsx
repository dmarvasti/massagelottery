/* tslint:disable */

import { Col, Row, Spin } from "antd";
import * as React from "react";
import styled from "styled-components";

interface CallbackProps {
  className?: string;    
}

class CallbackBase extends React.Component<CallbackProps> {
  public render() {
    return (
      <Row className={this.props.className} type="flex" justify="center">
        <Col xs={24} md={12}>
          <Spin size="large" />
        </Col>
      </Row>
    );
  }
}

export default styled(CallbackBase)`
  text-align: center;
` as any;

