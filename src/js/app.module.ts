import './rxjs-extensions';

import { NgModule }            from '@angular/core';
import { BrowserModule }       from '@angular/platform-browser';
import { FormsModule }         from '@angular/forms';
import { HttpModule }          from '@angular/http';

import { AppRoutingModule }    from './app-routing.module';
import { AppComponent }        from './components/app.component';
import { DashboardComponent }  from './components/dashboard.component';
import { chidiomDetailComponent } from './components/chidiom-detail.component';
import { chidiomsListComponent } from './components/chidiom-list.component';
import { chidiomSearchComponent } from './components/chidiom-search.component';
import { chidiomService }         from './services/chidiom.service';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        DashboardComponent,
        chidiomDetailComponent,
        chidiomsListComponent,
        chidiomSearchComponent,
    ],
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      AppRoutingModule,
  ],
  providers: [
      chidiomService,
  ],
})
export class AppModule { }
