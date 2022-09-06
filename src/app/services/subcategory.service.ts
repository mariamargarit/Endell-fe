import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subcategory } from '../models/subcategory.model';

@Injectable({
  providedIn: 'root',
})
export class SubcategoryService {
  constructor(private httpClient: HttpClient) {}

  getSubcategories(): Observable<Subcategory[]> {
    let url = 'http://localhost:8080/api/getAllSubcategories';
    return this.httpClient.get<Subcategory[]>(url);
  }

  createSubcategory(
    id: number,
    subcategory: Partial<{ name: any | null }>
  ): Observable<Object> {
    return this.httpClient.post(
      'http://localhost:8080/api/createSubcategory/' + id,
      subcategory
    );
  }

  deleteSubcategory(id: number): Observable<Subcategory> {
    let url = "http://localhost:8080/api/deleteSubcategory/" + id;
    return this.httpClient.delete<Subcategory>(url);
  }
}
