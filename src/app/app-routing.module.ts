import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/gaurds/auth.gaurd';
import { Layout2Component } from './shared/layouts/layout2/layout2.component';
import { ProductLayoutComponent } from './shared/layouts/layout2/product-layout/product-layout.component';

const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Apps' },
    // canActivate: [AuthGuard],
    // canLoad: [AuthGuard],
    component: Layout2Component,
    children: [
      {
        path: '',
        data: { breadcrumb: 'Home' },
        loadChildren: () =>
          import('./routes/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'product',
    data: { breadcrumb: 'Product' },
    component: ProductLayoutComponent,
    children: [
      {
        path: 'listing',
        data: { breadcrumb: 'Home' },
        loadChildren: () =>
          import('./routes/listing/listing.module').then(
            (m) => m.ListingModule
          ),
      },
      {
        path: ':id',
        data: { breadcrumb: 'Product Details' },
        loadChildren: () =>
          import('./routes/details/details.module').then(
            (m) => m.DetailsModule
          ),
      },
      {
        path: '',
        redirectTo: 'listing',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'auth',
    data: { breadcrumb: 'Auth' },
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '**', // Wildcard route
    redirectTo: '', // You can change to 'apps/dashboard' or a 404 module
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule { }
