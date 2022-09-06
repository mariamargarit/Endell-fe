import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class RoleGuardService implements CanActivate {  
    constructor(public auth: AuthService, public router: Router) {}  

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const expectedRole = route.data['expectedRole'];
        let t = [];
        t = JSON.parse(localStorage.getItem('user')!);
        console.log(t.role, expectedRole);
        if (!this.auth.isLoggedIn() || t.role !== expectedRole) {
          this.router.navigate(['']);
          return false;
        }
        return true;
      }
}