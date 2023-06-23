import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductAttribute } from '../models/product-attribute.model';

@Injectable({
  providedIn: 'root'
})
export class ProductAttributeService {

  constructor(private httpClient: HttpClient) { }

  createProductAttribute(
    productAttribute: Partial<{ name: any | null, attributeValues: any | null, subcategories: any | null }>
  ): Observable<Object> {
    return this.httpClient.post(
      'http://localhost:8080/api/createProductAttribute/',
      productAttribute
    );
  }

  getProductAttributes(): Observable<ProductAttribute[]> {
    let url = "http://localhost:8080/api/getAllProductAttributes";
    return this.httpClient.get<ProductAttribute[]>(url);
  }

  addSubcategoryToProductAttribute(subcategoryId: number, id: number|undefined): Observable<ProductAttribute[]> {
    let url = "http://localhost:8080/api/addSubcategoriesToProductAttribute/" + id;
    return this.httpClient.put<ProductAttribute[]>(url, subcategoryId);
  }

  addValuesToProductAttribute(valueId: number, id: number|undefined): Observable<ProductAttribute[]> {
    let url = "http://localhost:8080/api/addValuesToProductAttribute/" + id;
    return this.httpClient.put<ProductAttribute[]>(url, valueId);
  }

  deleteProductAttribute(id: number): Observable<ProductAttribute> {
    let url = "http://localhost:8080/api/deleteProductAttribute/" + id;
    return this.httpClient.delete<ProductAttribute>(url);
  }
}
