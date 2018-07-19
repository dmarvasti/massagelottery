/* tslint:disable */

import styled from "styled-components";
import { Spin } from 'antd';

import * as format from "date-fns/format";

import * as React from 'react';
import { LotteryShape } from "../redux/lottery/lotteryShape";
import { Slot } from "../generated/api"
import { Button, Icon, List, Row, Col, Tag } from 'antd';
import Pluralize from 'react-pluralize'

// Redux provided props via mapStateToProps
interface SlotsProps {
  slots: Slot[];
  selectSlot: (slotId: string | undefined) => void;
  isSelecting: boolean;
  selectedSlotId: string;
  className?: string;
}

class SlotsBase extends React.Component<SlotsProps> {
  
  
  public render() {
    return (
      <Row className={this.props.className} type="flex" justify="center">
        <Col xs={24} md={12}>
          <List
            bordered
            size="small"
            dataSource={this.props.slots}
            renderItem={slot => (
              <List.Item className={this.props.isSelecting ? "selecting" : ''}>
                <Col className={"slots--actions"} xs={2}>
                  <Button 
                    type="primary"
                    shape="circle"
                    className={this.isSelected(slot.id) ? "selected" : "unselected" }
                    icon={"check"}
                    size="small"
                    onClick={() => {
                      this.props.selectSlot(slot.id);
                  }}/>
                </Col>

                <Col className={"slots--meta"} xs={24}>

                  <div className={"item"}>{ format(new Date(slot.startTime), "dddd, h:mm A") }</div>
                  <Tag className={"item"} color="blue">
                    <Pluralize singular="person" count={slot.entryCount} /> signed up
                  </Tag>
                </Col>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    );
  }

   

  private isSelected = (slotId: string): boolean => {
    return slotId === this.props.selectedSlotId;
  }

}

export const Slots = styled(SlotsBase)`
  align-items: center;
  display: flex;

  .slots--actions {
    button {
      &.unselected {
        text-indent: -9999px;
      }
    }
  }

  .slots--meta {
    align-items: center;
    display: flex;

    .item {
      margin-right: 5px;
    }
  }

`;