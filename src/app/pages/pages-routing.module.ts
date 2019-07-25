import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WebsitesComponent} from './websites/websites.component';
import {LayoutComponent} from './layout/layout.component';
import {DocumentationComponent} from './documentation/documentation.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', redirectTo: 'websites'},
      {path: 'websites', component: WebsitesComponent},
      {path: 'documentation', component: DocumentationComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
