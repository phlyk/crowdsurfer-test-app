import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

import { Result } from 'app/shared/models/result.model';
import { HttpService } from 'app/shared/services/http.service';

@Component({
    selector: 'app-display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.scss'],
    //changeDetection: ChangeDetectionStrategy.OnPush <- makes results available only on filter
})
export class DisplayComponent implements OnInit {

    shouldSort: boolean = false;
    resultFeed: Result[];
    errorMessage;

    constructor(private dataService: HttpService,
                private changeDetectorRef:ChangeDetectorRef) { }

    ngOnInit() {
        this.getPromiseResults();
        //this.getObservableResults();
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
        this.resultFeed = res;
        console.log("End of data", this.resultFeed.length);
    }

    /**
     * assigns an ID to each result, useful for debugging not displaying
     */
    getResultId(result): number {
        return this.resultFeed.indexOf(result) + 1;
    }

    applySort(event: boolean){
        this.shouldSort = event;
        console.log("I am sorting? ", this.shouldSort);
        this.changeDetectorRef.detectChanges();
        console.log(this.resultFeed);
    }

    /**
     * Filters the dataset based on funding_type 
     * @param choice: the choice emitted from the filter component
     */
    filterResults(choice: string) {
        console.log(choice);
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
        if (!allData) {
            this.dataService.filterPromiseData(searchVar)
                .then((filteredResults) => this.handlePromiseData(filteredResults))
                .catch((error) => this.errorMessage = <any>error);
        } else {
            this.getPromiseResults();
        }
    }

    /**
 * The Observable way of getting data.
 * Observables are like streams of events and for a more complex HTTP operation
 * would be preferable to the Promises we're using thanks to their flexible nature
 * Also this creates duplicates for no reason
 */
    /*getObservableResults() {
        return this.dataService.getObservableData()
            .subscribe(
                (results) => this.handlePromiseData(results),
                (error) => this.errorMessage = error,
                () => console.log("yay")
            );
    }*/

}
