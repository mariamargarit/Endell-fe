import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AttributeValue } from '../models/attribute-value.model';

@Injectable({
  providedIn: 'root'
})
export class AttributeValueService {

  constructor(private httpClient: HttpClient) { }

  getAttributeValues(): Observable<AttributeValue[]> {
    let url = "http://localhost:8080/api/getAllAttributeValues";
    return this.httpClient.get<AttributeValue[]>(url);
  }

  createAttributeValue(
    attributeValue: Partial<{ val: any | null }>
  ): Observable<Object> {
    return this.httpClient.post(
      'http://localhost:8080/api/createAttributeValue/',
      attributeValue
    );
  }

  deleteAttributeValue(id: number): Observable<AttributeValue> {
    let url = "http://localhost:8080/api/deleteAttributeValue/" + id;
    return this.httpClient.delete<AttributeValue>(url);
  }
}
