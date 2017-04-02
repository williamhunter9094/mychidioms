import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { chidiom }                     from '../models/chidiom';
import { chidiomService }              from '../services/chidiom.service';
import { htmlTemplate }             from '../templates/chidiom-detail.html';

@Component({
    selector: 'my-chidiom-detail',
    styleUrls: ['dist/css/component/chidiom-detail.component.css'],
    template: htmlTemplate,
})

export class chidiomDetailComponent implements OnInit {
    chidiom: chidiom;
    error: any;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private chidiomService: chidiomService
    ) {}

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            if (id) {
                this.chidiomService.getchidiom(id)
                    .subscribe(chidiom => this.chidiom = chidiom);
            } else {
                this.chidiom = new chidiom();
            }
        });
    }

    save(): void {
        this.chidiomService
            .update(this.chidiom)
            .subscribe(
                chidiom => {
                    this.chidiom = chidiom; // saved chidiom, w/ id if new
                    this.goBack();
                },
                error => this.error = error  // TODO: Display error message
            );
    }

    goBack(): void {
        this.location.back();
    }

}
