import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Asset } from 'src/app/_models/asset';
import { Expense } from 'src/app/_models/expense';
import { AssetService } from 'src/app/_services/asset.service';
import { ExpensesService } from 'src/app/_services/expenses.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[];
  currentDate = new Date();
  minimumDate = new Date(1900, 1, 1);
  bsRangeValue: Date[];
  expense = {} as Expense;
  assets = [] as Asset[];
  selectedAsset: Asset;
  selectedAssetId: number;

  constructor(private expenseService: ExpensesService, private toastr: ToastrService, private assetService: AssetService) {
    this.bsRangeValue = [this.minimumDate, this.currentDate];
  }

  ngOnInit(): void {
    this.loadExpenses();
    this.loadAssets();
  }

  loadExpenses() {
    this.expenseService.getExpenses().subscribe(expenses => {
      this.expenses = expenses;
    });
  }

  deleteExpense(id: number) {
    this.expenseService.deleteExpense(id).subscribe(() => {
      this.loadExpenses();
      this.toastr.success("Expense removed!", "Success!")
    });
  }

  createExpense() {
    this.expense.assetId = this.selectedAssetId;
    this.expenseService.createExpense(this.expense).subscribe(response => {
      console.log(response);
      this.loadExpenses();
      this.toastr.success("Expense added!", "Success!")
    })
  }

  loadAssets() {
    this.assetService.getAssets().subscribe(assets => {
      this.assets = assets;
      this.selectedAsset = assets[0];
    });
  }

  onChange(value: number) {
    this.selectedAssetId = value;
  }

}
