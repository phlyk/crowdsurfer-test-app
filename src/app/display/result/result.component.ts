import { Component, OnInit, Input } from '@angular/core';

import { Result } from 'app/shared/models/result.model';

@Component({
  selector: 'resultView',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  @Input() result: Result;
  @Input() id: number;
  
  constructor() { }

  ngOnInit() {
  }

}
