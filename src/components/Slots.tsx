/* tslint:disable */

import * as React from 'react';
import { LotteryShape } from "../redux/lottery/lotteryShape";
import { Slot } from "../generated/api"

// Redux provided props via mapStateToProps
interface SlotsProps {
  slots: Slot[];
  selectSlot: (slotId: string | undefined) => void;
  selectedSlotId: string;
}


class Slots extends React.Component<SlotsProps> {
  
  
  public render() {
    return (
      <div>
        {
          this.props.slots.map((slot: Slot) =>
            <div key={slot.id}>
              isSelected: { this.isSelected((slot.id as any).toString()) ? "yes" : "no"}<br/>
              startTime: {slot.startTime}<br/>
              id: {slot.id}<br/>
              registeredCount: {slot.entryCount}<br/>
              <strong onClick={() => {
                this.props.selectSlot((slot.id as any).toString());
              }}>Select Slot</strong><br/>
              <br/><br/><br/>
            </div>
         )
        }
      </div>
    );
  }

  private isSelected = (slotId: string): boolean => {
    return slotId === this.props.selectedSlotId;
  }

}

export default Slots;