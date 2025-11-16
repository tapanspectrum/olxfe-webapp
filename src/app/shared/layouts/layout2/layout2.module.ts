import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { Layout2Component } from './layout2.component';
import { MenuComponent } from './menu/menu.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ProductLayoutComponent } from './product-layout/product-layout.component';
import { ProductHeaderComponent } from './product-header/product-header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    Layout2Component,
    BreadcrumbComponent,
    MenuComponent,
    SidebarComponent,
    TopbarComponent,
    FooterComponent,
    ProductLayoutComponent,
    ProductHeaderComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    NgbModule
  ],
  exports: [
    Layout2Component,
    ProductLayoutComponent,
    BreadcrumbComponent,
    MenuComponent,
    SidebarComponent,
    TopbarComponent
  ]
})
export class Layout2Module { }
