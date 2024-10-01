import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductFormComponent } from './product-form/product-form.component';
const routes: Routes = [
  {
    path : '',
    component : ProductsComponent
  },
  {
    path : 'add-product',
    component : ProductFormComponent
  },
  {
    path : 'edit-product/:id',
    component : ProductFormComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
