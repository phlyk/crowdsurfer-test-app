import { Component, OnInit, Input, Output } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { Result } from 'app/shared/models/result.model';

@Component({
  selector: '[resultView]',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})

export class ResultComponent implements OnInit {

  @Input() result: Result;
  @Input() id: number;

  constructor(public dialog: MdDialog) { }

  ngOnInit() {
  }

  openDialog() {
    //open that model
    //this.dialog.open(this.result.description);
    alert("Will come soon, be patient!");
  }

}
