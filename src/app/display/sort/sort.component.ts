import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';7

import { MdSlideToggle } from '@angular/material';

@Component({
    selector: '[display-sort]',
    templateUrl: './sort.component.html',
    styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {
    sortable: boolean = false;
    @Output() readySort: EventEmitter<boolean> = new EventEmitter(true);
    @ViewChild('slider') slideToggle: MdSlideToggle;
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
            //alert user to choose a sort
        }else{
            this.slideToggle.checked? this.sortOrder = 'asc' : this.sortOrder = 'desc';
            this.readySort.emit();
        }
    }
}