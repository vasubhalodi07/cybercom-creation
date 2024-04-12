import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { FetchProductComponent } from './components/fetch-product/fetch-product.component';
import { formCheckGuard } from '../../core/guard/form-check.guard';
import { authCheckGuard } from '../../core/guard/auth-check.guard';

const routes: Routes = [
  {
    path: '',
    component: FetchProductComponent,
  },
  {
    path: 'add',
    component: AddProductComponent,
    canActivate: [authCheckGuard],
    canDeactivate: [formCheckGuard],
  },
  {
    path: 'update/:id',
    component: UpdateProductComponent,
    canActivate: [authCheckGuard],
    canDeactivate: [formCheckGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
