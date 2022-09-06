import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<Product[]>{
    let url = "http://localhost:8080/api/getAllProducts";
    return this.httpClient.get<Product[]>(url);
  }

  createProduct(
    id: number,
    product: Partial<{ name: any | null }>
  ): Observable<Object> {
    return this.httpClient.post(
      'http://localhost:8080/api/createProduct/' + id,
      product
    );
  }

  deleteProduct(id: number): Observable<Product> {
    let url = "http://localhost:8080/api/deleteProduct/" + id;
    return this.httpClient.delete<Product>(url);
  }
}
