import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { chidiom } from '../models/chidiom';

@Injectable()
export class chidiomService {
    private chidiomsUrl = 'app/chidioms';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) { }

    getchidioms(): Observable<chidiom[]> {
        return this.http
            .get(this.chidiomsUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getchidiom(id: number): Observable<chidiom> {
        return this.getchidioms()
            .map(chidioms => {
                console.log('chidioms', chidioms);
                return chidioms.filter(chidiom => chidiom.id === id)[0];
            });
    }

    create(name: string): Observable<chidiom> {
        return this.http
          .post(this.chidiomsUrl, JSON.stringify({name: name}), this.options)
          .map(this.extractData)
          .catch(this.handleError);
    }

    update(chidiom: chidiom): Observable<chidiom>  {
        let url = `${this.chidiomsUrl}/${chidiom.id}`;

        return this.http
          .put(url, JSON.stringify(chidiom), this.options)
          .map(() => chidiom);
    }

    delete(chidiom: chidiom): Observable<Response> {
        let url = `${this.chidiomsUrl}/${chidiom.id}`;

        return this.http
            .delete(url, this.options);
    }

    private extractData(res: Response) {
        return res.json();
    }

    private handleError (error: Response | any) {
        console.log('HANDLE ERROR');
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
