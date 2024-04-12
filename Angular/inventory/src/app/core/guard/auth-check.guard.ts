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
export class authCheckGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any | UrlTree {
    const token = JSON.parse(localStorage.getItem('id')!);
    console.log(token);

    console.log(route);
    const url = state.url.split('/')[1];
    console.log(url);

    if (token) {
      return token ? true : this.router.createUrlTree([`/${url}`]);
    } else {
      return this.router.createUrlTree([`/${url}`]);
    }
  }
}
