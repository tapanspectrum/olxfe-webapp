import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { AdsComponent } from './ads/ads.component';
import { ChooseAreaComponent } from './choose-area/choose-area.component';
import { LocationsAreaComponent } from './locations-area/locations-area.component';
import { CounterAreaComponent } from './counter-area/counter-area.component';
import { PublishedAreaComponent } from './published-area/published-area.component';
import { ServicesAreaComponent } from './services-area/services-area.component';
import { PricingAreaComponent } from './pricing-area/pricing-area.component';
import { BlogAreaComponent } from './blog-area/blog-area.component';
import { CallToActionAreaComponent } from './call-to-action-area/call-to-action-area.component';


@NgModule({
  declarations: [
    HomeComponent,
    CategoryComponent,
    AdsComponent,
    ChooseAreaComponent,
    LocationsAreaComponent,
    CounterAreaComponent,
    PublishedAreaComponent,
    ServicesAreaComponent,
    PricingAreaComponent,
    BlogAreaComponent,
    CallToActionAreaComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
