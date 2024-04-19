import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = JSON.parse(localStorage.getItem('id') || 'null');
    const role = JSON.parse(localStorage.getItem('role') || 'null');

    if (token && role) {
      const path = route.routeConfig?.path || '';

      if (path === 'users' && role === 'admin') {
        return true;
      } else if (path === 'users' && role === 'customer') {
        return this.router.navigate(['/task']);
      } else {
        return token ? true : this.router.navigate(['/']);
      }
    } else {
      return this.router.navigate(['/']);
    }
  }
}
