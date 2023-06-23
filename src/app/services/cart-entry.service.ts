import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartEntry } from '../models/cartEntry.model';

@Injectable({
  providedIn: 'root'
})
export class CartEntryService {
  id: number;

  constructor(private httpClient: HttpClient) { 
    const user = JSON.parse(localStorage.getItem('user') as string);
    if(user != null){
      this.id = user.id;
    }
  }

  createCartEntry(
    cartEntry: Partial<{ quantity: any | null, variantId: any | null }>
  ): Observable<CartEntry>{
    let url = "http://localhost:8080/api/createCartEntry/" + this.id;
    return this.httpClient.post<CartEntry>(url, cartEntry);
  }

  deleteCartEntry(id: number|undefined): Observable<CartEntry> {
    let url = "http://localhost:8080/api/deleteCartEntry/" + id;
    return this.httpClient.delete<CartEntry>(url);
  }
}
