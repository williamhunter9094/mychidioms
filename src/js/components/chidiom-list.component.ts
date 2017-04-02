import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { chidiom } from '../models/chidiom';
import { chidiomService } from '../services/chidiom.service';
import { htmlTemplate } from '../templates/chidiom-list.html';

@Component({
    selector: 'my-chidioms',
    styleUrls: ['dist/css/component/chidiom-list.component.css'],
    template: htmlTemplate,
})

export class chidiomsListComponent implements OnInit {
    chidioms: chidiom[];
    selectedchidiom: chidiom;
    // addingchidiom = false;
    error: any;

    constructor(
        private router: Router,
        private chidiomService: chidiomService) { }

    getchidioms() {
        this.chidiomService
            .getchidioms()
            .subscribe(
                chidioms => this.chidioms = chidioms,
                error => this.error = error // TODO: Display error message
            );
    }

    add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.chidiomService.create(name)
          .subscribe(chidiom => {
              this.chidioms.push(chidiom);
              this.selectedchidiom = null;
          });
    }

    // close(savedchidiom: chidiom) {
    //     this.addingchidiom = false;
    //     if (savedchidiom) { this.getchidioms(); }
    // }

    delete(chidiom: chidiom, event: any) {
        event.stopPropagation();
        this.chidiomService
            .delete(chidiom)
            .subscribe(
                res => this.chidioms = this.chidioms.filter(h => h.id !== chidiom.id),
                error => this.error = error // TODO: Display error message
            );
    }

    ngOnInit() {
        this.getchidioms();
    }

    onSelect(chidiom: chidiom) {
        this.selectedchidiom = chidiom;
        // this.addingchidiom = false;
    }

    gotoDetail() {
        this.router.navigate(['/detail/:id', { id: this.selectedchidiom.id }]);
    }
}
