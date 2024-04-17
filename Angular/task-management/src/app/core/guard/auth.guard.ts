import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any | UrlTree {
    const token = JSON.parse(localStorage.getItem('id') || 'null');
    const role = JSON.parse(localStorage.getItem('role') || 'null');

    console.log(token);
    console.log(role);

    if (token && role) {
      const path = route.routeConfig?.path || '';

      if (path === 'users' && role === 'admin') {
        return true;
      } else if (path === 'users' && role === 'customer') {
        return this.router.createUrlTree(['/task']);
      } else {
        return token ? true : this.router.createUrlTree(['/']);
      }
    } else {
      return this.router.createUrlTree(['/']);
    }
  }
}
