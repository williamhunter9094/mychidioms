import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './components/dashboard.component';
import { chidiomsListComponent }  from './components/chidiom-list.component';
import { chidiomDetailComponent }  from './components/chidiom-detail.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard',
  },
  {
    component: DashboardComponent,
    path: 'dashboard',
  },
  {
    component: chidiomDetailComponent,
    path: 'detail/:id',
  },
  {
    component: chidiomsListComponent,
    path: 'chidioms',
  },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule {}
