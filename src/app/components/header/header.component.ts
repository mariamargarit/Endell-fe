import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Brand } from 'src/app/models/brand.model';
import { Category } from 'src/app/models/category.model';
import { AuthService } from 'src/app/services/auth.service';
import { BrandService } from 'src/app/services/brand.service';
import { CategoryService } from 'src/app/services/category.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  classRef = HeaderComponent;
  options = this._formBuilder.group({
    fixed: true,
    top: 60,
  });
  loginService: AuthService;
  isLoggedIn: boolean;
  // 0 - user
  // 1 - admin
  static userRole: string;
  static user: any;
  categories: Category[];
  brands: Brand[];

  constructor(
    private _formBuilder: FormBuilder,
    loginService: AuthService,
    private categoryService: CategoryService,
    private brandService: BrandService
  ) {
    this.isLoggedIn = loginService.isLoggedIn();
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string);
    HeaderComponent.user = user as any;
    if (user !== null) HeaderComponent.userRole = user.role;
    this.getCategories();
    this.getBrands();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  getBrands(){
    this.brandService.getBrands().subscribe((res) => {
      this.brands = res;
    })
  }
}
