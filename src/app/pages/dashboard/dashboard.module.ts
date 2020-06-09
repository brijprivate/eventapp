import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';
import { dashboardRoutingModule } from './dashboard.router.module';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { CreateEventPage } from './create-event/create-event.page';
import { CreateContactGroupPage } from './create-contact-group/create-contact-group.page';
import { CreateTemplatePage } from './create-template/create-template.page';

import { MatButtonModule, MatCheckboxModule,MatNativeDateModule ,MatSelectModule,MatRadioModule,MatInputModule,MatFormFieldModule, MatDatepickerModule,MatChipsModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    IonicModule,
    dashboardRoutingModule,
    MatMenuModule,
    MatIconModule,MatChipsModule,ReactiveFormsModule,
    MatButtonModule, MatCheckboxModule,MatNativeDateModule ,MatSelectModule,MatRadioModule,MatInputModule,MatFormFieldModule, MatDatepickerModule
  ],
  entryComponents: [CreateEventPage,CreateContactGroupPage,CreateTemplatePage],
  declarations: [DashboardPage,CreateEventPage,CreateContactGroupPage,CreateTemplatePage]
})
export class DashboardPageModule {}
