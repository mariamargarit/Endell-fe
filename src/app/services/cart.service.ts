import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) { }

  getCarts(email: string): Observable<Cart> {
    let url = "http://localhost:8080/api/getAllCarts?email=" + email;
    return this.httpClient.get<Cart>(url);
  }

  getCurrentCart(email: string): Observable<Cart> {
    let url = "http://localhost:8080/api/getCurrentCart?email=" + email;
    return this.httpClient.get<Cart>(url);
  }

  updateCartQuantity(id: number|undefined, quantity: number|undefined): Observable<Cart> {
    let url = "http://localhost:8080/api/updateCartQuantity/" + id;
    return this.httpClient.put<Cart>(url, quantity);
  }
}
