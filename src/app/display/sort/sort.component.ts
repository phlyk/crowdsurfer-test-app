import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';7

import { MdSlideToggle, MdTooltip } from '@angular/material';

@Component({
    selector: '[display-sort]',
    templateUrl: './sort.component.html',
    styleUrls: ['./sort.component.scss']
})
export class SortComponent {
    sortable: boolean = false; //if the sort field should be applied
    nonSelect: boolean = false; //if the user hasn't selected a sorting field
    @Output() readySort: EventEmitter<boolean> = new EventEmitter(true); //tell the display component it's ready to be sorted
    @ViewChild('slider') slideToggle: MdSlideToggle; //access the child components using ViewChild
    @ViewChild('alert') tooltip: MdTooltip;
    selectedValue: string; //sorting value
    sortOrder: string; //sorting order

    //the sort options available
    choices = [
        {value: 'end_time', viewValue: 'End date'},
        {value: 'raised', viewValue: 'Amount Raised'}
    ];

    /**
     * The sort component doesn't do the sorting it just tells the parent component to apply the ArraySort Pipe
     * checks if user has chosen a value
     */
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