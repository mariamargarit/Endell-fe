import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { CartComponent } from './components/cart/cart.component';
import { HeroComponent } from './components/hero/hero.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SignupComponent } from './components/signup/signup.component';
import { RoleGuardService } from './services/role-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'hero', component: HeroComponent },
  { 
    path: 'dashboard', 
    component: AdminProfileComponent, 
    canActivate: [RoleGuardService],
    data: { 
      expectedRole: 'admin'
    }  
  },
  { 
    path: 'admin-panel', 
    component: AdminPanelComponent,
    canActivate: [RoleGuardService],
    data: { 
      expectedRole: 'admin'
    }  
  },
  { path: 'cart', component: CartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
