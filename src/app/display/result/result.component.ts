import { Component, OnInit, Input, Output } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { ModalComponent } from './modal/modal.component';
import { Result } from 'app/shared/models/result.model';
import { Reward } from 'app/shared/models/reward.model';

@Component({
  selector: '[resultView]',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})

export class ResultComponent implements OnInit {

  @Input() result: Result;
  @Input() id: number;
  @Input() sorted: boolean = false;
  showMore: boolean = false;

  constructor(public dialog: MdDialog) { }

  ngOnInit() {
  }

  openDialog() {
    let dialogRef = this.dialog.open(ModalComponent, {
      height: '420px',
      width: '40%',
      position: {
        left: '40%' //750px
      }
    });
    dialogRef.componentInstance.data = this.result;
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

  displayMore() {
    this.showMore = !this.showMore;
  }

}