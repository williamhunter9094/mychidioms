import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs';

import { chidiom }           from '../models/chidiom';

@Injectable()
export class chidiomSearchService {

    constructor(private http: Http) {}

    search(term: string): Observable<chidiom[]> {
        return this.http
            .get(`app/chidioms/?name=${term}`)
            .map((r: Response) => r.json() as chidiom[]);
    }
}
