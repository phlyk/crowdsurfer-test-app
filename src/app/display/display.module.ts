import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule, MdRadioModule } from '@angular/material';

import { DisplayComponent } from './display.component';
import { ResultComponent } from './result/result.component';
import { FilterComponent } from './filter/filter.component';
import { SortComponent } from './sort/sort.component';

import { HttpService } from 'app/shared/services/http.service';
import { ArraySortPipe } from './sort/array-sort.pipe';
import { OrderByPipe } from './sort/order-by.pipe';

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
    ArraySortPipe,
    OrderByPipe,
    SortComponent
  ],
  providers: [
    HttpService
  ]
})
export class DisplayModule { }
