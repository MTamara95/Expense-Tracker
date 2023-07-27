import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Expense } from '../_models/expense';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  baseUrl = environment.apiUrl;
  paginatedResult: PaginatedResult<Expense[]> = new PaginatedResult<Expense[]>;

  constructor(private http: HttpClient) { }

  getExpenses(page?: number, itemsPerPage?: number) {
    let params = new HttpParams();

    if(page && itemsPerPage) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Expense[]>(this.baseUrl + 'expenses', {observe: 'response', params}).pipe(
      map(response => {
        if(response.body) {
          this.paginatedResult.result = response.body;
        }
        const pagination = response.headers.get('Pagination');
        if (pagination) {
          this.paginatedResult.pagination = JSON.parse(pagination);
        }
        return this.paginatedResult;
      })
    );
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
