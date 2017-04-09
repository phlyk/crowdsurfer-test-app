import { Component, OnInit, Input, Output } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { ModalComponent } from './modal/modal.component';
import { Result } from 'app/shared/models/result.model';

@Component({
  selector: '[resultView]',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})

export class ResultComponent implements OnInit {

  @Input() result: Result;
  @Input() id: number;
  showMore: boolean = false;

  constructor(public dialog: MdDialog) { }

  ngOnInit() {
  }

  openDialog() {
    let dialogRef = this.dialog.open(ModalComponent, {
      height: '400px',
      width: '40%',
      position: {
        left: '40%' //750px
      }
    });
    dialogRef.componentInstance.data = this.result;
    dialogRef.componentInstance.rewards = this.result.rewards_list;
    dialogRef.componentInstance.id = this.id;
    dialogRef.afterClosed().subscribe(result => {
      console.log("Closed Modal here's some data :", result);
    });
  }

  displayMore() {
    this.showMore = !this.showMore;
  }

}

/**
 * this.dialog.open(StandardDialog, config)
         .then(res => {
            this.dialogRef = res;
            this.dialogRef.componentInstance.title = title;
            this.dialogRef.componentInstance.contents = contents;
         });
 */