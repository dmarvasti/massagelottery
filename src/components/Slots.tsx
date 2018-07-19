/* tslint:disable */

import styled from "styled-components";
import { Spin } from 'antd';

import * as format from "date-fns/format";

import * as React from 'react';
import { LotteryShape } from "../redux/lottery/lotteryShape";
import { Slot } from "../generated/api"
import { Button, Icon, List, Row, Col, Tag } from 'antd';
import Pluralize from 'react-pluralize'
import { AuthShape } from "../redux/auth/authShape";

// Redux provided props via mapStateToProps
interface SlotsProps {
  slots: Slot[];
  selectSlot: (slotId: string | undefined) => void;
  isAdmin: boolean;
  isSelecting: boolean;
  isFinished: boolean;
  selectedSlotId: string;
  className?: string;
  authd: AuthShape;
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
              <div onClick={() => {
                !this.props.isFinished && this.props.selectSlot(slot.id);
              }}>
              <List.Item 
                className={this.props.isSelecting ? "selecting" : ''}
                >

                  {
                    !this.props.isFinished && (
                      <Col className={"slots--actions"} xs={2}>
                      <Button 
                        type="primary"
                        shape="circle"
                        className={this.isSelected(slot.id) ? "selected" : "unselected" }
                        icon={"check"}
                        size="small"
                        onClick={() => {
                          this.props.selectSlot(slot.id);
                        }}
                      />
                    </Col>
                    )
                  }

                  <Col className={"slots--meta"} xs={this.props.isFinished ? 26 : 24}>
                    <div className={"item"}>{ format(new Date(slot.startTime), "ddd, h:mm A") }</div>
                    {
                      this.props.isFinished ? (
                        <Tag className={"item"} color="volcano">
                          {
                            this.props.isAdmin && (
                              `Winner: ${slot.winner}`
                            )
                          }

                          {
                            !this.props.isAdmin && (
                              <div>
                                <Pluralize singular="person" plural="people" count={slot.entryCount} /> entered
                              </div>  
                              
                            )
                          }
                        </Tag>
                      ) : (
                        <Tag className={"item"} color="blue">
                          <Pluralize singular="person" plural="people" count={slot.entryCount} /> entered
                        </Tag>
                      )
                    }
                    
                  </Col>
              </List.Item>
              </div>
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
  .ant-list-split .ant-list-item:last-child {
    border-bottom: 1px solid #e8e8e8;
  }

  .ant-list-item {
    cursor: pointer;
  }

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