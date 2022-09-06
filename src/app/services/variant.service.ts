import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Variant } from '../models/variant.model';

@Injectable({
  providedIn: 'root'
})
export class VariantService {

  constructor(private httpClient: HttpClient) { }

  getVariants(): Observable<Variant[]> {
    let url = "http://localhost:8080/api/getAllVariants";
    return this.httpClient.get<Variant[]>(url);
  }

  createVariant(
    id: number,
    variant: Partial<{ availableQuantity: any | null, price: any | null, addedDate: any | null }>
  ): Observable<Object> {
    return this.httpClient.post(
      'http://localhost:8080/api/createVariant/' + id,
      variant
    );
  }

  deleteVariant(id: number): Observable<Variant> {
    let url = "http://localhost:8080/api/deleteVariant/" + id;
    return this.httpClient.delete<Variant>(url);
  }
}
