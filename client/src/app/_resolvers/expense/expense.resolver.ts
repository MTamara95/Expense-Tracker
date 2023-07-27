import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Expense } from 'src/app/_models/expense';
import { PaginatedResult } from 'src/app/_models/pagination';
import { ExpensesService } from 'src/app/_services/expenses.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseResolver  {
  pageNumber = 1;
  pageSize = 10;

  constructor(private expenses: ExpensesService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<PaginatedResult<Expense[]>> {
    // const page = route.queryParamMap.get('page');
    // const pageSize = route.queryParamMap.get('pageSize');

    return this.expenses.getExpenses(this.pageNumber, this.pageSize);
  }
}
