import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root',
})
export class RouteGuard implements CanActivate {
  constructor(private as: AuthService, private router: Router) {}

  path: import('@angular/router').ActivatedRouteSnapshot[];
  route: import('@angular/router').ActivatedRouteSnapshot;
  canActivate(path, route): boolean | Observable<boolean> | Promise<boolean> {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise((resolve) => {
      this.as.user.subscribe((user) => {
        if (user) {
          resolve(true);
        } else {
          this.router.navigate(['/login']);
        }
      });
    });
  }
}

// return new Promise((resolve) => {
//   this.as.user.subscribe((user) => {
//     if (user) resolve(true);
//     else this.router.navigate(['/login']);
//   });
// });

// if(this.as.user){
//   return true;
//   else{
//    this.router.navigate(['/login']);
//   }
