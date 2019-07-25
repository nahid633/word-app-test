import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
import {SharedModule} from '../shared/shared.module';
import { WebsitesComponent } from './websites/websites.component';
import { LayoutComponent } from './layout/layout.component';
import { DocumentationComponent } from './documentation/documentation.component';
@NgModule({
  declarations: [WebsitesComponent, LayoutComponent, DocumentationComponent],
  imports: [
    PagesRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
