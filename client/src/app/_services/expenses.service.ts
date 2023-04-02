import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Expense } from '../_models/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getExpenses() {
    return this.http.get<Expense[]>(this.baseUrl + 'expenses');
  }

  deleteExpense(id: number) {
    return this.http.delete<Expense>(this.baseUrl + 'expenses/' + id);
  }

  createExpense(expense: Expense) {
    return this.http.post(this.baseUrl + 'expenses', expense);
  }

  getExpensesSum() {
    return this.http.get<number>(this.baseUrl + 'expenses/sum');
  }

}
