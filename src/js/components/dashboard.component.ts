import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { chidiom } from '../models/chidiom';
import { chidiomService } from '../services/chidiom.service';
import { htmlTemplate } from '../templates/dashboard.html';

@Component({
    selector: 'my-dashboard',
    styleUrls: ['dist/css/component/dashboard.component.css'],
    template: htmlTemplate,
})

export class DashboardComponent implements OnInit {
    chidioms: chidiom[] = [];

    constructor(
        private router: Router,
        private chidiomService: chidiomService
    ) {
        console.log('DashboardComponent');
    }

    getchidioms() {
        this.chidiomService.getchidioms()
            .subscribe(chidioms => {
                this.chidioms = chidioms.slice(1, 5);
            });
    }

    gotoDetail(chidiom: chidiom): void {
        let link = ['/detail', chidiom.id];
        this.router.navigate(link);
    }

    ngOnInit() {
        this.getchidioms();
    }
}
