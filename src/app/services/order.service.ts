import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  getOrders(): Observable<Order[]> {
    let url = "http://localhost:8080/api/getAllOrders";
    return this.httpClient.get<Order[]>(url);
  }

  getOrdersByUser(id: number|null): Observable<Order[]> {
    let url = "http://localhost:8080/api/getAllOrdersByUser/" + id;
    return this.httpClient.get<Order[]>(url);
  }

  createOrder(order: Order): Observable<Object> {
    let url = "http://localhost:8080/api/createOrder";
    return this.httpClient.post(url, order);
  }
}
