import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './components/signup/signup.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LogoutComponent } from './components/logout/logout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AngularMaterialModule } from './angular-material.module';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AdminCategoriesComponent } from './components/admin-categories/admin-categories.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminSubcategoriesComponent } from './components/admin-subcategories/admin-subcategories.component';
import { AdminCategoriesDialogComponent } from './components/admin-categories/admin-categories-dialog/admin-categories-dialog.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminVariantsComponent } from './components/admin-variants/admin-variants.component';
import { AdminProductAttributesComponent } from './components/admin-product-attributes/admin-product-attributes.component';
import { AdminAttributeValueComponent } from './components/admin-attribute-value/admin-attribute-value.component';
import { AdminSubcategoriesDialogComponent } from './components/admin-subcategories/admin-subcategories-dialog/admin-subcategories-dialog.component';
import { AdminProductsDialogComponent } from './components/admin-products/admin-products-dialog/admin-products-dialog.component';
import { AdminVariantsDialogComponent } from './components/admin-variants/admin-variants-dialog/admin-variants-dialog.component';
import { AdminAttributeValuesDialogComponent } from './components/admin-attribute-value/admin-attribute-values-dialog/admin-attribute-values-dialog.component';
import { RoleGuardService } from './services/role-guard.service';
import { HeroComponent } from './components/hero/hero.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartComponent } from './components/cart/cart.component';
import { FooterComponent } from './components/footer/footer.component';
import { CategoryPageComponent } from './components/category-page/category-page.component';
import { AdminProductAttributesDialogComponent } from './components/admin-product-attributes/admin-product-attributes-dialog/admin-product-attributes-dialog.component';
import { AdminAddSubcategoriesDialogComponent } from './components/admin-product-attributes/admin-add-subcategories-dialog/admin-add-subcategories-dialog.component';
import { AdminAddValuesDialogComponent } from './components/admin-product-attributes/admin-add-values-dialog/admin-add-values-dialog.component';
import { AdminAddAssignedValuesDialogComponent } from './components/admin-variants/admin-add-assigned-values-dialog/admin-add-assigned-values-dialog.component';
import { AdminBrandComponent } from './components/admin-brand/admin-brand.component';
import { AdminBrandDialogComponent } from './components/admin-brand/admin-brand-dialog/admin-brand-dialog.component';
import { BrandPageComponent } from './components/brand-page/brand-page.component';
import { ProductDetailsPageComponent } from './components/product-details-page/product-details-page.component';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    LogoutComponent,
    HeaderComponent,
    HomeComponent,
    DashboardComponent,
    AdminPanelComponent,
    AdminCategoriesComponent,
    AdminSubcategoriesComponent,
    AdminUsersComponent,
    AdminProductAttributesComponent,
    AdminCategoriesDialogComponent,
    AdminProductsComponent,
    AdminVariantsComponent,
    AdminOrdersComponent,
    AdminSubcategoriesDialogComponent,
    AdminAttributeValueComponent,
    AdminProductsDialogComponent,
    AdminAttributeValuesDialogComponent,
    AdminVariantsDialogComponent,
    HeroComponent,
    ProductCardComponent,
    CartComponent,
    FooterComponent,
    CategoryPageComponent,
    AdminProductAttributesDialogComponent,
    AdminAddSubcategoriesDialogComponent,
    AdminAddValuesDialogComponent,
    AdminAddAssignedValuesDialogComponent,
    AdminBrandComponent,
    AdminBrandDialogComponent,
    BrandPageComponent,
    ProductDetailsPageComponent,
    CheckoutPageComponent,
    ChatbotComponent,
    OrderHistoryComponent
  ],
  imports: [
    BrowserModule,                                                                                                               
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [AuthGuardService, RoleGuardService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
