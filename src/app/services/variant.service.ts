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

  addValuesToVariant(assignedValueId: number, id: number|undefined): Observable<Variant[]> {
    let url = "http://localhost:8080/api/addAssignedValuesToVariant/" + id;
    return this.httpClient.put<Variant[]>(url, assignedValueId);
  }

  deleteVariant(id: number): Observable<Variant> {
    let url = "http://localhost:8080/api/deleteVariant/" + id;
    return this.httpClient.delete<Variant>(url);
  }

  getVariantsBySubcategory(id: number|null): Observable<Variant[]> {
    let url = "http://localhost:8080/api/getVariantsBySubcategory/" + id;
    return this.httpClient.get<Variant[]>(url);
  }

  getVariantsByBrand(id: number|null): Observable<Variant[]> {
    let url = "http://localhost:8080/api/getVariantsByBrand/" + id;
    return this.httpClient.get<Variant[]>(url);
  }

  getVariantsByBrandName(id: string): Observable<Variant[]> {
    let url = "http://localhost:8080/api/getVariantsByBrandName/" + id;
    return this.httpClient.get<Variant[]>(url);
  }

  getVariant(id: number|null): Observable<Variant> {
    let url = "http://localhost:8080/api/getVariant/" + id;
    return this.httpClient.get<Variant>(url);
  }
}
