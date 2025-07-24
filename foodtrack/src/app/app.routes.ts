import { Routes } from '@angular/router';
import { ProductCrudComponent } from '../libs/components/product/product-crud.component';
import { App } from './app';

export const routes: Routes = [
  { path: '', component: App },
  { path: 'crud-teste', component: ProductCrudComponent },
];
