import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  model: any = {};
  expenseForm: FormGroup;

  constructor(private expenseService: ExpensesService, private toastr: ToastrService, private assetService: AssetService, private fb: FormBuilder) {
    this.bsRangeValue = [this.minimumDate, this.currentDate];
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadExpenses();
    this.loadAssets();
  }

  initializeForm() {
    this.expenseForm = this.fb.group({
      assetId: ['', Validators.required],
      purchaseDate: ['', Validators.required],
      amount: ['', Validators.required],
    })
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
    this.expenseService.createExpense(this.expenseForm.value).subscribe(response => {
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

}
