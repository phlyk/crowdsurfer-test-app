import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MaterialModule, 
  MdRadioModule,
  MdSliderModule,
  MdSelectModule,
  MdDialogModule,
} from '@angular/material';

import { DisplayComponent } from './display.component';
import { ResultComponent } from './result/result.component';
import { ModalComponent } from './result/modal/modal.component';
import { RewardComponent } from './result/modal/reward/reward.component';
import { FilterComponent } from './filter/filter.component';
import { SortComponent } from './sort/sort.component';

import { HttpService } from 'app/shared/services/http.service';
import { ArraySortPipe } from './sort/array-sort.pipe';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MdRadioModule,
    MdDialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    DisplayComponent
  ],
  declarations: [
    DisplayComponent,
    ResultComponent,
    FilterComponent,
    ArraySortPipe,
    SortComponent,
    ModalComponent,
    RewardComponent
  ],
  entryComponents: [ModalComponent],
  providers: [
    HttpService
  ],
  bootstrap: [DisplayComponent]
})
export class DisplayModule { }
