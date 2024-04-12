import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FetchUserComponent } from './components/fetch-user/fetch-user.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { formCheckGuard } from '../../core/guard/form-check.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { authCheckGuard } from '../../core/guard/auth-check.guard';

const routes: Routes = [
  {
    path: '',
    component: FetchUserComponent,
  },
  {
    path: 'add',
    component: AddUserComponent,
    canActivate: [authCheckGuard],
    canDeactivate: [formCheckGuard],
  },
  {
    path: 'update/:id',
    component: UpdateUserComponent,
    canActivate: [authCheckGuard],
    canDeactivate: [formCheckGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
    canDeactivate: [formCheckGuard],
  },
  {
    path: 'profile',
    canActivate: [authCheckGuard],
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
