import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssignedValue } from '../models/assigned-value.model';
@Injectable({
  providedIn: 'root'
})
export class AssignedValueService {

  constructor(private httpClient: HttpClient) { }

  getAssignedValues(): Observable<AssignedValue[]> {
    let url = "http://localhost:8080/api/getAllAssignedValues";
    return this.httpClient.get<AssignedValue[]>(url);
  }

  deleteAssignedValue(id: number): Observable<AssignedValue> {
    let url = "http://localhost:8080/api/deleteAssignedValue/" + id;
    return this.httpClient.delete<AssignedValue>(url);
  }
}
