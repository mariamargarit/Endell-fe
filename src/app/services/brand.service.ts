import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand.model';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private httpClient: HttpClient) { }

  addBrand(brand: Brand): Observable<Brand>{
    let url = "http://localhost:8080/api/createBrand";
    return this.httpClient.post<Brand>(url, brand);
  }

  getBrands(): Observable<Brand[]> {
    let url = "http://localhost:8080/api/getAllBrands";
    return this.httpClient.get<Brand[]>(url);
  }
  
  deleteBrand(id: number): Observable<Brand> {
    let url = "http://localhost:8080/api/deleteBrand/" + id;
    return this.httpClient.delete<Brand>(url);
  }
}
