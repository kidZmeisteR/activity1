import { Routes } from '@angular/router';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductFormComponent } from './products/product-form/product-form.component';

export const routes: Routes = [
    {path: 'products', component: ProductListComponent},
    {path: 'products/:id', component: ProductDetailComponent},
    {path: 'product/add', component: ProductFormComponent},
    {path: 'product/edit/:id', component: ProductFormComponent},
    {path: '', redirectTo: '/products', pathMatch: 'full'}
];
