import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    styleUrls: ['dist/css/component/app.component.css'],
    template: `
        <h1>{{title}}</h1>
        <nav>
            <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
            <a routerLink="/chidioms" routerLinkActive="active">chidioms</a>
        </nav>
        <router-outlet></router-outlet>
    `,
})
export class AppComponent {
    title = 'Tour of chidioms';
}
