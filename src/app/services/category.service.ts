import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  addCategory(category: Category): Observable<Category>{
    let url = "http://localhost:8080/api/createCategory";
    return this.httpClient.post<Category>(url, category);
  }

  getCategories(): Observable<Category[]> {
    let url = "http://localhost:8080/api/getAllCategories";
    return this.httpClient.get<Category[]>(url);
  }

  getCategory(name: string|null): Observable<Category> {
    let url = "http://localhost:8080/api/getCategory/" + name;
    return this.httpClient.get<Category>(url);
  }
  
  deleteCategory(id: number): Observable<Category> {
    let url = "http://localhost:8080/api/deleteCategory/" + id;
    return this.httpClient.delete<Category>(url);
  }
}
