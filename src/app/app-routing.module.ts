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
import { CategoryPageComponent } from './components/category-page/category-page.component';
import { BrandPageComponent } from './components/brand-page/brand-page.component';
import { ProductDetailsPageComponent } from './components/product-details-page/product-details-page.component';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';

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
  { path: 'cart', component: CartComponent },
  { path: 's/:subcategory', component: CategoryPageComponent},
  { path: 'b/:brand', component: BrandPageComponent},
  { path: 'p/:product', component: ProductDetailsPageComponent},
  { path: 'c/:cart', component: CheckoutPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
