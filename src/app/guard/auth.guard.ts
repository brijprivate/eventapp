import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/DataService';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private dataService : DataService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log('Loggin flag check'+this.dataService.getIsLoggedIn());
      const currentUser = this.dataService.getIsLoggedIn();
      if (currentUser) {
          // authorised so return true
          return true;
      }
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/landing']);
      return false;
  }
}