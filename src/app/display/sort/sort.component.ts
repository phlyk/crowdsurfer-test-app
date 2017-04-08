import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: '[display-sort]',
    templateUrl: './sort.component.html',
    styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {
    sortable: boolean = false;
    @Output() readySort: EventEmitter<boolean> = new EventEmitter(true);
//React to an onclick event which emits a (sort) event for the display to react to
    ngOnInit(){
    }

    applySort(){
        //TODO specify which element to sort by
        this.sortable = !this.sortable;
        this.readySort.emit(this.sortable);
    }

}