import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FetchCategoryComponent } from './components/fetch-category/fetch-category.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { UpdateCategoryComponent } from './components/update-category/update-category.component';
import { formCheckGuard } from '../../core/guard/form-check.guard';
import { authCheckGuard } from '../../core/guard/auth-check.guard';

const routes: Routes = [
  {
    path: '',
    component: FetchCategoryComponent,
  },
  {
    path: 'add',
    component: AddCategoryComponent,
    canActivate: [authCheckGuard],
    canDeactivate: [formCheckGuard],
  },
  {
    path: 'update/:id',
    component: UpdateCategoryComponent,
    canActivate: [authCheckGuard],
    canDeactivate: [formCheckGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
