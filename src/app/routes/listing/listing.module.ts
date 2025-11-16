import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListingRoutingModule } from './listing-routing.module';
import { ListingComponent } from './listing/listing.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductSidebarComponent } from './product-sidebar/product-sidebar.component';


@NgModule({
  declarations: [
    ListingComponent,
    ProductSidebarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ListingRoutingModule
  ]
})
export class ListingModule { }
