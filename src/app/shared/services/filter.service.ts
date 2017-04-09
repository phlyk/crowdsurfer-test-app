import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { HttpService } from './http.service';

import { Result } from 'app/shared/models/result.model';
import { Reward } from 'app/shared/models/reward.model';

@Injectable()
export class FilterService {

    constructor(private dataService: HttpService){}

    /**
     * returns prefiltered data by Funding so the component calling the service doesn't have to
     * @param resultsArray 
     * affects resultsFeed with the filtered result which is then displayed
     */
    public filterPromiseDataFunding(choiceFunding: string): Promise<Result[]> {
        let workingArray = this.dataService.getPromiseData()
            .then((results) => results.filter(
                result => {
                    return result.funding_type === choiceFunding;
                })
            );
        return workingArray;
    }
    /**
     * returns prefiltered data by Reward so the component calling the service doesn't have to
     * @param resultsArray 
     * affects resultsFeed with the filtered result which is then displayed
     */
    public filterPromiseDataReward(searchVar: string): Promise<Result[]> {
        let workingArray: Promise<Result[]>;
        switch (searchVar) {
            case 'more10':
                workingArray = this.dataService.getPromiseData()
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
                workingArray = this.dataService.getPromiseData()
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
                workingArray = this.dataService.getPromiseData()
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
        return workingArray;
    }
    /**
     * the general filter function used to combine filters in the filter component
     * @param choiceFunding : the funding type to filter by
     * @param choiceReward : the reward amount of filter by
     */
    public generalFilter(choiceFunding: string, choiceReward: string) {
        let rewardFilter = this.filterPromiseDataReward(choiceReward);
        return rewardFilter.then((rewardData) => rewardData.filter(
            result => {
                return result.funding_type === choiceFunding;
            }))
            .catch(error => console.log("general filter with this error :", error));
    }
}