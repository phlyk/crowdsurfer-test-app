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
    nbItems: number[] = [53, 38, 7];
    @Output() onSelected = new EventEmitter<string>();

    constructor(private dataService: HttpService) { }

    ngOnInit() {
        this.options = ['All Types', 'Reward Funding', 'Equity Funding'];
        this.choice = this.options[0];
        this.options.forEach((item, index) => this.getNbFromService(item, index));
    }

    /**
     * emits the choice to the display component to be filtered
     */
    onFilter() {
        this.onSelected.emit(this.choice);
    }

    /**
     * Due to an Issue with [(ngModel)] (two way data binding)
     * I need to use this method to receive the change
     * @param event: the changed value
     */
    onChange(event) {
        this.choice = event.value;
    }
    /**
     * Function to display the number of filtered values for each radio button
     * @param choice : the choice on the radio button in string format
     * @param pos : the index of the radio button to display the number of filtered values
     */
    getNbFromService(choice: string, pos: number) {
        let val: number;
        let searchVar: string;
        let allData = false;
        switch (choice) {
            case 'Reward Funding':
                searchVar = 'R';
                break;
            case 'Equity Funding':
                searchVar = 'E';
                break;
            default:
                allData = true;
        }        
        if(allData){
            this.dataService.getPromiseData()
            .then((res) => this.handleServiceFilterNumber(res.length, pos))
            .catch((error) => console.error("todo"));
        }else{
            let filteredarray = this.dataService.filterPromiseData(searchVar)
                .then((results) => this.handleServiceFilterNumber(results.length, pos))
                .catch((error) => console.error("todo"));
        }

    }
    /**
     * I have learnt that it is much easier to handle promise data within an auxiliary function
     * then within the .then() clause!
     * This function updates the amount of items present for each filter option
     * @param value: the amount of filtered values
     * @param pos: the position of nbItems where the value should be inserted
     */
    handleServiceFilterNumber(value: number, pos:number){
        this.nbItems[pos] = value;
    }
}