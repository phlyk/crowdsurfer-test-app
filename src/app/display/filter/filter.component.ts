import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { HttpService } from 'app/shared/services/http.service';

@Component({
    selector: 'filterView',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
    //react to an onclick event (event) which is passed to the display component
    options: string[];
    choice: string;
    @Output() onSelected = new EventEmitter<string>();

    constructor(private dataService: HttpService){}

    ngOnInit(){
        this.options = ['All Types', 'Reward Funding', 'Equity Funding'];
        this.choice = this.options[0];
    }
    /**
     * sends the choice to the display component to be filtered
     */
    onFilter(){
        this.onSelected.emit(this.choice);
    }
    /**
     * Due to an Issue with [(ngModel)] (two way data binding)
     * I need to use this method to receive the change
     * @param event: the changed value
     */
    onChange(event){
        this.choice = event.value;
    }
}