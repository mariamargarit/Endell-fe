import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  showFiller = true;
  options = this._formBuilder.group({
    fixed: true,
    top: 64,
  });
  categoriesTable: boolean;
  usersTable: boolean;
  ordersTable: boolean;
  productsTable: boolean;
  attributesTable: boolean;

  constructor(private _formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  changePage() {
    this.router.navigate(['dashboard']);
  }

  selectCategoriesTable() {
    this.categoriesTable = !this.categoriesTable;
    this.usersTable = false;
    this.ordersTable = false;
    this.productsTable = false;
    this.attributesTable = false;
  }

  selectUsersTable() {
    this.usersTable = !this.usersTable;
    this.ordersTable = false;
    this.categoriesTable = false;
    this.productsTable = false;
    this.attributesTable = false;
  }

  selectOrdersTable() {
    this.ordersTable = !this.ordersTable;
    this.categoriesTable = false;
    this.usersTable = false;
    this.productsTable = false;
    this.attributesTable = false;
  }

  selectProductsTable() {
    this.productsTable = !this.productsTable;
    this.categoriesTable = false;
    this.usersTable = false;
    this.ordersTable = false;
    this.attributesTable = false;
  }

  selectAttributesTable() {
    this.attributesTable = !this.attributesTable
    this.categoriesTable = false;
    this.usersTable = false;
    this.ordersTable = false;
    this.productsTable = false;
  }
}
