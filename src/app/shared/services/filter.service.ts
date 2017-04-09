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

}