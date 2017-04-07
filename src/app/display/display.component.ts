import { Component, OnInit } from '@angular/core';

import { Result } from 'app/shared/models/result.model';
import { HttpService } from 'app/shared/services/http.service';

@Component({
    selector: 'app-display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

    resultFeed: Result[];
    errorMessage;

    constructor(private dataService: HttpService) { }

    ngOnInit() {;
        this.getPromiseResults();
        //this.getObservableResults();
    }

    getPromiseResults() {
        let httpfile = this.dataService.getPromiseData()
            .then(
            (results) => this.handlePromiseData(results),
            (error) => this.errorMessage = <any>error);
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
    getResultId(result): number{
        return this.resultFeed.indexOf(result)+1;
    }
    /**
     * Filters the dataset based on funding_type 
     * @param choice: the choice emitted from the filter component
     */
    filterResults(choice: string){
        console.log(choice);
        let searchVar: string;
        let allData = false;
        switch (choice){
            case 'Reward Funding':
                searchVar = 'R';
                break;
            case 'Equity Funding':
                searchVar = 'E';
                break;
            default:
                allData = true;
        }
        if(!allData){
            this.dataService.getPromiseData()
                .then(
                    (results) => this.filterPromiseData(results, searchVar),
                    (error) => this.errorMessage = <any>error);
        }else{
            //this works
            this.getPromiseResults();
        }
    }
    /**
     * auxiliary function to help the filtering
     * @param resultsArray 
     * affects resultsFeed with the filtered result which is then displayed
     */
    filterPromiseData(resultsArray, choice: string){
        let workingArray: any;
        console.log("Filtering with :",choice);
        workingArray = resultsArray.filter(
            result => {
                return result.funding_type === choice;
            }
        );
        this.resultFeed = workingArray;
    }
}
