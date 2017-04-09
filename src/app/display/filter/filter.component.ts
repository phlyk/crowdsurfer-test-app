import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { HttpService } from 'app/shared/services/http.service';
import { FilterService} from 'app/shared/services/filter.service';

@Component({
    selector: 'filterView',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
    //react to an onclick event (event) which is passed to the display component
    optionsFunding: string[];
    choiceFunding: string;
    optionsReward: string[];
    choiceReward: string;
    nbFundingItems: any[] = ['X', 'X', 'X']; //dummy number so array is initalised 
    nbRewardItems: any[] = ['X', 'X', 'X', 'X'];
    @Output() onSelected = new EventEmitter<string>();

    constructor(private dataService: HttpService,
                private filterService: FilterService) { }

    ngOnInit() {
        this.optionsFunding = ['All Types', 'Reward Funding', 'Equity Funding'];
        this.choiceFunding = this.optionsFunding[0];
        this.optionsFunding.forEach((item, index) => this.getNbFundingFromChoice(item, index));

        this.optionsReward = ['All', '10 or more', '5 or more', 'None'];
        this.choiceReward = this.optionsReward[0];
        this.optionsReward.forEach((item, index) => this.getNbRewardFromChoice(item, index));
    }

    /**
     * emits the choiceFunding to the display component to be filtered
     */
    onFilter() {
        this.onSelected.emit(this.choiceFunding);
    }

    /**
     * Due to an Issue with [(ngModel)] (two way data binding)
     * I need to use this method to receive the change
     * @param event: the changed value
     */
    onChangeFunding(event) {
        this.choiceFunding = event.value;
    }

    onChangeReward(event){
        this.choiceReward = event.value;
    }
    /**
     * Function to display the number of filtered values for each radio button
     * @param choiceFunding : the choiceFunding on the radio button in string format
     * @param pos : the index of the radio button to display the number of filtered values
     */
    getNbFundingFromChoice(choiceFunding: string, pos: number) {
        let val: number;
        let searchVar: string;
        let allData = false;
        switch (choiceFunding) {
            case 'Reward Funding':
                searchVar = 'R';
                break;
            case 'Equity Funding':
                searchVar = 'E';
                break;
            default:
                allData = true;
        }
        if (allData) {
            this.dataService.getPromiseData()
                .then((res) => this.handleServiceFilterNumber(res.length, pos))
                .catch((error) => console.error("todo"));
        } else {
            let filteredarray = this.filterService.filterPromiseDataFunding(searchVar)
                .then((results) => this.handleServiceFilterNumber(results.length, pos))
                .catch((error) => console.error("todo"));
        }

    }
    /**
     * I have learnt that it is much easier to handle promise data within an auxiliary function
     * then within the .then() clause!
     * This function updates the amount of items present for each filter option
     * @param value: the amount of filtered values
     * @param pos: the position of nbFundingItems where the value should be inserted
     */
    handleServiceFilterNumber(value: number, pos: number) {
        this.nbFundingItems[pos] = value;
    }

    getNbRewardFromChoice(choiceReward: string, pos: number) {
        let searchVar: string;
        let allData = false;
        switch (choiceReward) {
            case '10 or more':
                searchVar = 'more10';
                break;
            case '5 or more':
                searchVar = 'more5';
                break;
            case 'None':
                searchVar = 'none';
                break;
            default:
                allData = true;
        }
        if (allData) {
            this.dataService.getPromiseData()
                .then((res) => this.handleServiceFilterRewardNumber(res.length, pos))
                .catch((error) => console.error("error with nbReward on allData"));
        } else {
            this.filterService.filterPromiseDataReward(searchVar)
                .then((results) => this.handleServiceFilterRewardNumber(results.length, pos))
                .catch((error) => console.error("error with nbReward trying to filter", searchVar, error));
        }
    }

    handleServiceFilterRewardNumber(value: number, pos: number) {
        this.nbRewardItems[pos] = value;
    }
}