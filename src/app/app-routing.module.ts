import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
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
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'hero', component: HeroComponent },
  { 
    path: 'admin-panel', 
    component: AdminPanelComponent,
    canActivate: [RoleGuardService],
    data: { 
      expectedRole: 'admin'
    }  
  },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuardService] },
  { path: 's/:subcategory', component: CategoryPageComponent},
  { path: 'b/:brand', component: BrandPageComponent},
  { path: 'p/:product', component: ProductDetailsPageComponent},
  { path: 'checkout', component: CheckoutPageComponent, canActivate: [AuthGuardService]},
  { path: 'order-history/:user', component: OrderHistoryComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
