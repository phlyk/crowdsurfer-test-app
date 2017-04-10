import { Component, OnInit, ViewChild } from '@angular/core';
import { ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

import { SortComponent } from './sort/sort.component';
import { FilterComponent } from './filter/filter.component';

import { Result } from 'app/shared/models/result.model';
import { HttpService } from 'app/shared/services/http.service';
import { FilterService } from 'app/shared/services/filter.service';

@Component({
    selector: 'app-display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.scss']
})

/**
 * the main shell of the application taking up 80% of the horizontal screen displaying all the results from the query
 * The display handles all the possible manipulation of the displayed results
 */
export class DisplayComponent implements OnInit {

    @ViewChild('sorter') sortComponent: SortComponent; //give access to the sort component
    @ViewChild('filter') filterComponent: FilterComponent; //and the filter component
    emptyRes: boolean = false; //if no data then display message
    resultFeed: Result[]; //the feed of all results
    errorMessage: string | any;
    //variables used for sorting
    shouldSort: boolean = false;
    sortOrder: string;
    sortValue: string;

    constructor(private dataService: HttpService,
        private filterService: FilterService,
        private changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit() {
        this.getPromiseResults();
        //this.initialFeed = this.resultFeed; attempted optimisation doesn't work
    }
    /**
     * Calls the data service to query the server and associate all the JSON elements in the resultsFeed
     * Promises are useful for this kind of "Do one job and then die" way of retrieving data
     * If the data were not a static JSON file I would have used Observables
     */
    getPromiseResults() {
        this.dataService.getPromiseData()
            .then(
            (results) => this.handlePromiseData(results),
            (error) => this.errorMessage = <any>error);
    }

    /** auxiliary function to handle data from the service and associate it to resultFeed
     * @param res: the json parsed data from the HTTP get
     */
    handlePromiseData(res: Result[]) {
        if (res) {
            this.resultFeed = res;
            this.emptyRes = false;
            console.log("End of data", this.resultFeed.length);
        } else {
            this.emptyRes = true;
        }
    }

    /**
     * assigns an ID to each result, useful for debugging and displaying sort order
     * The JSON data didn't  have an ID field so I had to make one myself
     */
    getResultId(result): number {
        return this.resultFeed.indexOf(result) + 1;
    }

    //changes the variables which in turn notifies the Pipe to apply the sort
    applySort() {
        this.sortOrder = this.sortComponent.sortOrder;
        this.sortValue = this.sortComponent.selectedValue;
        this.shouldSort = true;
        this.changeDetectorRef.detectChanges();
    }

    /**
     * Filters the dataset based on the choices of the filter component
     * @param choice: the choice emitted from the filter component
     */
    filterResults() {
        let choiceF = this.filterComponent.choiceFunding;
        let choiceR = this.filterComponent.choiceReward;
        choiceF = this.turnStringIntoVariable(choiceF);
        choiceR = this.turnStringIntoVariable(choiceR);
        if ((choiceF == 'all') && (choiceR == 'all')) {
            this.getPromiseResults();
            return;
        }
        if (choiceR == 'all') {
            this.filterFundingType(choiceF);
            return;
        }
        if (choiceF == 'all') {
            this.filterRewardType(choiceR);
            return;
        } else {
            this.filterService.generalFilter(choiceF, choiceR)
                .then((filteredResults) => this.handleGeneralFilter(filteredResults))
                .catch(error => console.error("error from data service", error));
        }
    }

    /**
     * The auxiliary function used to associate the resultsFeed with the filtered data
     * This is only called in the case of filtering more than one data type
     * @param filteredRes : the filteredData from the generalFilter
     */
    private handleGeneralFilter(filteredRes: void | Result[]) {
        if (filteredRes) {
            this.resultFeed = filteredRes;
            if (filteredRes.length == 0) {
                this.emptyRes = true;
            }else{
                this.emptyRes = false;
                console.log("end of data : ", filteredRes.length);
            }
        } else {
            console.error("Even when filteredRes is void it is doesn't get here");
        }
    }
    /**
     * Simple function that turns the strings used to display data on the radio buttons into string that
     * could be used to search with in the FilterService.
     * @param choice : string to transform
     */
    turnStringIntoVariable(choice: string) {
        let searchVar;
        switch (choice) {
            case 'Reward Funding':
                searchVar = 'R';
                break;
            case 'Equity Funding':
                searchVar = 'E';
                break;
            case '10 or more':
                searchVar = 'more10';
                break;
            case '5 or more':
                searchVar = 'more5';
                break;
            case 'None':
                searchVar = 'none';
                break;
            case 'All Types':
                searchVar = 'all';
                break;
            case 'All':
                searchVar = 'all';
                break;
            default:
                break;
        }
        return searchVar;
    }

    /**
     * Filter by only one parameter the funding_type which is either E or R
     * @param searchVar : search 'E' or 'R'?
     */
    filterFundingType(searchVar: string) {
        this.filterService.filterPromiseDataFunding(searchVar)
            .then((filteredResults) => this.handlePromiseData(filteredResults))
            .catch((error) => this.errorMessage = <any>error);
    }

    /**
     * Filter by only one parameter the amount of rewards available
     * Available options were "10 or more", "5 or more" or "none"
     * @param searchVar : choice to search by
     */
    filterRewardType(searchVar: string) {
        this.filterService.filterPromiseDataReward(searchVar)
            .then((filteredResults) => this.handlePromiseData(filteredResults))
            .catch((error) => this.errorMessage = <any>error);
    }

}
