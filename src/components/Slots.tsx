/* tslint:disable */

import * as React from 'react';
import { LotteryShape } from "../redux/lottery/lotteryShape";
import { Slot } from "../generated/api"

// Redux provided props via mapStateToProps
interface SlotsProps {
  slots: Slot[];
}


class Slots extends React.Component<SlotsProps> {
  public render() {
    return (
      <div>
        {
          this.props.slots.map((slot: Slot) =>
            <div key={slot.id}>
              startTime: {slot.startTime}<br/>
              id: {slot.id}<br/>
              registeredCount: {slot.registeredCount}<br/><br/><br/>
            </div>
         )
        }
      </div>
    );
  }
}

export default Slots;