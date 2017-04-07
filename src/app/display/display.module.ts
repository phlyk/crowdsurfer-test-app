import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule, MdRadioModule } from '@angular/material';

import { DisplayComponent } from './display.component';
import { ResultComponent } from './result/result.component';
import { FilterComponent } from './filter/filter.component';

import { HttpService } from 'app/shared/services/http.service';
import { AmountRaisedPipe } from './filter/amount-raised.pipe';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MdRadioModule
  ],
  exports: [
    DisplayComponent
  ],
  declarations: [
    DisplayComponent,
    ResultComponent,
    FilterComponent,
    AmountRaisedPipe
  ],
  providers: [
    HttpService
  ]
})
export class DisplayModule { }
