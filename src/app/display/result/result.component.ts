import { Component, Input, Output } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { ModalComponent } from './modal/modal.component';
import { Result } from 'app/shared/models/result.model';
import { Reward } from 'app/shared/models/reward.model';

@Component({
  selector: '[resultView]',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
/**
 * The component that represented each element of the JSON data 
 * aka. each company had its own RewardComponent.
 * The component displays as much relevant data as it can and provides a link to the crowdfunding website
 * as well as opens a modal to display all the potential rewards that could interest the user
 */
export class ResultComponent{

  @Input() result: Result;
  @Input() id: number; //the results ID, non hard-coded
  @Input() sorted: boolean = false; //whether it should display its id to show its 'rank'
  showMore: boolean = false; //boolean value to extend the view or not and display more info

  constructor(public dialog: MdDialog) { }

  /**
   * Function to open the dialog when the button "Show Pledge Rewards" is pressed
   * the function opens the dialog and sizes it accordingly while moving it to the left so that it looks
   * to be in the center of the "results" area
   * Most rewards were unsorted providing for strange results so it also sorts the rewards_list in ascending order by pledge amount
   */
  openDialog() {
    let dialogRef = this.dialog.open(ModalComponent, {
      height: '420px',
      width: '40%',
      position: {
        left: '40%' //750px
      }
    });
    //dialogRef.componentInstance gives an instance of the component. Essential!
    if (this.result.rewards_list) {
      dialogRef.componentInstance.rewards = this.result.rewards_list
        .sort((a: Reward, b: Reward) => {
          if ((a.pledge == undefined) && (b.pledge == undefined)) {
            return 0;
          }
          if (a.pledge == undefined) {
            return -1
          }
          if (b.pledge == undefined) {
            return 1;
          }
          if (a.pledge < b.pledge) {
            return -1;
          } else if (a.pledge > b.pledge) {
            return 1;
          } else {
            return 0;
          }
        });
    }
    dialogRef.componentInstance.id = this.id;
  }

  //toggle the "show more"/"show less" button
  displayMore() {
    this.showMore = !this.showMore;
  }

}