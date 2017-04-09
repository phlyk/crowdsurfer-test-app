import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Result } from 'app/shared/models/result.model';

@Injectable()
export class HttpService {
    private url: string = "https://s3-eu-west-1.amazonaws.com/crowdsurfer-json-dumps/blockchain-projects.json";

    cachedData: Result[];
    filteredData;

    constructor(private http: Http) { }

    public getPromiseData(): Promise<Result[]> {
        return this.http.get(this.url)
            .toPromise()
            .then((data) => this.onResponse(data))
            .catch(this.onError);
    }

    public getObservableData(): Observable<Result[]> {
        if (this.cachedData) {
            return Observable.of(this.cachedData);
        } else {
            return this.http.get(this.url)
                .map(res => <Result[]>res.json())
                .do((data) => this.cachedData = data)
                .catch((err: Response | any) => this.onError(err));
        }
    }

    private onResponse(res: Response): Result[] {
        let body = res.json();
        return body as Result[];
    }

    private onError(err: Response | any) {
        let errJson = err.json() || {};
        let errText;

        if (errJson['detail']) {
            errText = errJson['detail'];
        }
        else {
            errText = 'Unknown server error';
        }
        console.error(errText);
        return errText;
    }

    /**
     * returns prefiltered data so the component callign the service doesn't have to
     * @param resultsArray 
     * affects resultsFeed with the filtered result which is then displayed
     */
    public filterPromiseData(choiceFunding: string): Promise<Result[]> {
        let workingArray = this.getPromiseData()
            .then((results) => results.filter(
                result => {
                    return result.funding_type === choiceFunding;
                })
            );
        this.filteredData = workingArray;
        return workingArray;
    }

    public filterPromiseDataReward(searchVar: string): Promise<Result[]> {
        let workingArray: Promise<Result[]>;
        switch (searchVar) {
            case 'more10':
                workingArray = this.getPromiseData()
                    .then((results) => results.filter(
                        result => {
                            if (result.rewards_list != undefined) {
                                return result.rewards_list.length > 10;
                            } else {
                                return false;
                            }
                        }
                    ));
                break;
            case 'more5':
                workingArray = this.getPromiseData()
                    .then((results) => results.filter(
                        result => {
                            if (result.rewards_list != undefined) {
                                return result.rewards_list.length > 5;
                            } else {
                                return false;
                            }
                        }
                    ));
                break;
            case 'none':
                workingArray = this.getPromiseData()
                    .then((results) => results.filter(
                        result => {
                            if (result.rewards_list == undefined) {
                                return true;
                            }
                            return false;
                        }
                    ));
            default:
                break;
        }
        this.filteredData = workingArray;
        return workingArray;
    }

    public generalFilter(choiceFunding: string, choiceReward: string) {
        let rewardFilter = this.filterPromiseDataReward(choiceReward);
        return rewardFilter.then((rewardData) => rewardData.filter(
            result => {
                return result.funding_type === choiceFunding;
            }))
            .catch(error => console.log("general filter with this error :", error));
    }
}