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

    constructor(private http: Http) { }

    public getPromiseResults(): Promise<Result[]> {
        return this.http.get(this.url)
            .toPromise()
            .then((data) => this.onResponse(data));
            //.catch(this.onError); TODO add error catching
    }

    public getObservableResults(): Observable<Result[]>{
        return this.http.get(this.url)
            .map((data) => this.onResponse(data))
            .catch((err: Response | any) => this.onError(err));
    }

    private onResponse(res: Response): Result[]{
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

        return Observable.throw(errText);
    }
}
    /*
   private getHttpOptions() {
        let httpHeaders = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });

        let httpOptions = new RequestOptions({
            headers: httpHeaders
        });

        return httpOptions;
    }
    */