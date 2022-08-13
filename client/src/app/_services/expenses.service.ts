import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Expense } from '../_models/expense';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token
  })
}

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getExpenses() {
    return this.http.get<Expense[]>(this.baseUrl + 'expenses', httpOptions);
  }

  deleteExpense(id: number) {
    return this.http.delete<Expense>(this.baseUrl + 'expenses/' + id, httpOptions);
  }

  // get expense?
}
