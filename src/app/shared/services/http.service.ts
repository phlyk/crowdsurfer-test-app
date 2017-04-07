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

    constructor(private http: Http) { }

    public getPromiseData(): Promise<Result[]> {
        return this.http.get(this.url)
            .toPromise()
            .then((data) => this.onResponse(data))
            .catch(this.onError);
    }

    public getObservableData(): Observable<Result[]> {
        if(this.cachedData){
            return Observable.of(this.cachedData);
        }else{
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
}