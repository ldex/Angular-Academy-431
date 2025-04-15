import { Routes } from '@angular/router';
import { HomeComponent } from './shared/home.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ContactComponent } from './shared/contact.component';
import { AdminComponent } from './shared/admin.component';
import { ErrorComponent } from './shared/error.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductInsertComponent } from './products/product-insert/product-insert.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to home on empty path
    { path: 'home', component: HomeComponent },
    { path: 'products', children: [
        { path: '', loadComponent: () => import('./products/product-list/product-list.component').then(m => m.ProductListComponent) }, // Lazy load product list
        { path: 'insert', component: ProductInsertComponent },
        { path: ':id', component: ProductDetailComponent },
    ]},
    { path: 'contact', component: ContactComponent },
    { path: 'admin', component: AdminComponent },
    { path: '**', component: ErrorComponent }, // Wildcard route for a 404 page
];
