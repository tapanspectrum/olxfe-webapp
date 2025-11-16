import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { LoginComponent , ProductCardComponent } from './components';






@NgModule({
  declarations: [
    ProductCardComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxStarRatingModule,
    NgxSliderModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxStarRatingModule,
    ProductCardComponent,
    LoginComponent,
    NgxSliderModule
  ]
})
export class SharedModule { }
