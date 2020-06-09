import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import {
  
  MatFormFieldModule,
  
} from '@angular/material';
import { MyProfilePage } from './my-profile.page';

const routes: Routes = [
  {
    path: '',
    component: MyProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),MatFormFieldModule
  ],
  declarations: []
})
export class MyProfilePageModule {}
