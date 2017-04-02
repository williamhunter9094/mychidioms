import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import { chidiomSearchService } from '../services/chidiom-search.service';
import { chidiom } from '../models/chidiom';
import { htmlTemplate } from '../templates/chidiom-search.html';

@Component({
  providers: [ chidiomSearchService ],
  selector: 'chidiom-search',
  styleUrls: [ 'dist/css/component/chidiom-search.component.css' ],
  template: htmlTemplate,
})
export class chidiomSearchComponent implements OnInit {
  chidioms: Observable<chidiom[]>;
  private searchTerms = new Subject<string>();

  constructor(
      private chidiomSearchService: chidiomSearchService,
      private router: Router) {}

// Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.chidioms = this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
          // return the http search observable
        ? this.chidiomSearchService.search(term)
          // or the observable of empty chidioms if no search term
        : Observable.of<chidiom[]>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(error);
        return Observable.of<chidiom[]>([]);
      });
  }

  gotoDetail(chidiom: chidiom): void {
      let link = ['/detail', chidiom.id];
      this.router.navigate(link);
  }
}
