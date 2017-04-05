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
        let httpfile = this.dataService.getPromiseResults()
            .then(
            (results) => this.handlePromiseData(results),
            (error) => this.errorMessage = <any>error);
    }

    getObservableResults() {
        return this.dataService.getObservableResults()
            .subscribe(
                (results) => this.handlePromiseData(results),
                (error) => this.errorMessage = error,
                () => console.log("yay")
            );

    }

    handlePromiseData(res: Result[]) {
        this.resultFeed = res;
        console.log("End of data")
    }
    getResultId(res): number{
        return this.resultFeed.indexOf(res);
    }

}
