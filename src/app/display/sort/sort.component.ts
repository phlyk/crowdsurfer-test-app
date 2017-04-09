import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';7

import { MdSlideToggle, MdTooltip } from '@angular/material';

@Component({
    selector: '[display-sort]',
    templateUrl: './sort.component.html',
    styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {
    sortable: boolean = false;
    nonSelect: boolean = false;
    @Output() readySort: EventEmitter<boolean> = new EventEmitter(true);
    @ViewChild('slider') slideToggle: MdSlideToggle;
    @ViewChild('alert') tooltip: MdTooltip;
    selectedValue: string;
    sortOrder: string;

    choices = [
        {value: 'end_time', viewValue: 'End date'},
        {value: 'raised', viewValue: 'Amount Raised'},
        {value: 'more_to_come', viewValue: 'And More!'}
    ];

    ngOnInit(){

    }

    applySort(){
        if(this.selectedValue === undefined){
           this.nonSelect = true;
        }else{
            this.nonSelect = false;
            this.slideToggle.checked? this.sortOrder = 'asc' : this.sortOrder = 'desc';
            this.readySort.emit();
        }
    }
}