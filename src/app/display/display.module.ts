import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisplayComponent } from './display.component';
import { ResultComponent } from './result/result.component';

import { HttpService } from 'app/shared/services/http.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    DisplayComponent
  ],
  declarations: [
    DisplayComponent,
    ResultComponent
  ],
  providers: [
    HttpService
  ]
})
export class DisplayModule { }
