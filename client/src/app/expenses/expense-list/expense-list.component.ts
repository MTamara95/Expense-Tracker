import { Component, OnInit } from '@angular/core';
import { Expense } from 'src/app/_models/expense';
import { ExpensesService } from 'src/app/_services/expenses.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[];

  constructor(private expenseService: ExpensesService) { }

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses() {
    this.expenseService.getExpenses().subscribe(expenses => {
      this.expenses = expenses;
    });
  }

  deleteExpense(id: number) {
    this.expenseService.deleteExpense(id).subscribe(() => {
      this.loadExpenses();
    });
  }

}
