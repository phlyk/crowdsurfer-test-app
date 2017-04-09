import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Result } from 'app/shared/models/result.model';

@Injectable()
export class HttpService {

    private url: string = "https://s3-eu-west-1.amazonaws.com/crowdsurfer-json-dumps/blockchain-projects.json"; //static url

    cachedData: Result[]; //used for the Observable function

    constructor(private http: Http) { }

    /**
     * fetches the JSON data from the URL and return it in a Promise of results
     * Promises do one task and one task only, they are then "done"
     */
    public getPromiseData(): Promise<Result[]> {
        return this.http.get(this.url)
            .toPromise()
            .then((data) => this.onResponse(data))
            .catch(this.onError);
    }
    /**
     * fetches the JSON data from the url and returns it in Observable format
     * Due to the nature of the fetch being a stagnant file and Observable was not neccesary
     * as Observables return a stream of data that the component subscribes to
     * If the data changes, the component subscribed to the Obserable gets updated
     */
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
    /**
     * Auxiliary function to handle promise data
     * @param res : the JSON data extracted from the URL
     */
    private onResponse(res: Response): Result[] {
        let body = res.json();
        return body as Result[];
    }

    /**
     * Error handling if needed
     * If the server hands us an error (unlikely) we recuperate it
     * if not the error is "unknown"
     * @param err : the error from the server in JSON format
     */
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