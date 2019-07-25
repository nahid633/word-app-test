import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ClarityModule} from '@clr/angular';
import {TranslateModule} from '@ngx-translate/core';
import {MomentModule} from 'ngx-moment';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule,
    TranslateModule,
    MomentModule
  ],
  exports: [
    // modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule,
    TranslateModule,
    MomentModule]
})
export class SharedModule { }
