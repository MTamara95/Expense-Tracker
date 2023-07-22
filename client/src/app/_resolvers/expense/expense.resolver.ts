import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Expense } from 'src/app/_models/expense';
import { ExpensesService } from 'src/app/_services/expenses.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseResolver  {
  constructor(private expenses: ExpensesService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Expense[]> {
    return this.expenses.getExpenses();
  }
}
