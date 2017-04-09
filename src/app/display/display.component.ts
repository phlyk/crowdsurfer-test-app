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
    styleUrls: ['./display.component.scss'],
    //changeDetection: ChangeDetectionStrategy.OnPush <- makes results available only on filter
})
export class DisplayComponent implements OnInit {

    @ViewChild('sorter') sortComponent: SortComponent;
    @ViewChild('filter') filterComponent: FilterComponent;
    shouldSort: boolean = false;
    emptyRes: boolean = false;
    resultFeed: Result[];
    //initialFeed: Result[];
    errorMessage;
    sortOrder: string;
    sortValue: string;

    constructor(private dataService: HttpService,
        private filterService: FilterService,
        private changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit() {
        this.getPromiseResults();
        //this.initialFeed = this.resultFeed; attempted optimisation doesn't work
    }

    getPromiseResults() {
        this.dataService.getPromiseData()
            .then(
            (results) => this.handlePromiseData(results),
            (error) => this.errorMessage = <any>error);
    }

    /** auxiliary function to handle data from the service
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
     */
    getResultId(result): number {
        return this.resultFeed.indexOf(result) + 1;
    }

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

    handleGeneralFilter(filteredRes: void | Result[]) {
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

    filterFundingType(searchVar: string) {
        this.filterService.filterPromiseDataFunding(searchVar)
            .then((filteredResults) => this.handlePromiseData(filteredResults))
            .catch((error) => this.errorMessage = <any>error);
    }

    filterRewardType(searchVar: string) {
        this.filterService.filterPromiseDataReward(searchVar)
            .then((filteredResults) => this.handlePromiseData(filteredResults))
            .catch((error) => this.errorMessage = <any>error);
    }

}
