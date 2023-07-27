import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Asset } from 'src/app/_models/asset';
import { Expense } from 'src/app/_models/expense';
import { Pagination } from 'src/app/_models/pagination';
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
  expenseForm: UntypedFormGroup;
  totalExpensesSum: number;
  pagination: Pagination | undefined;
  pageNumber = 1;
  pageSize = 10;
  pageSizes: number[] = [5, 10, 20, 50, 100];

  constructor(private expenseService: ExpensesService, private toastr: ToastrService, private assetService: AssetService, private fb: UntypedFormBuilder, private activatedRoute: ActivatedRoute) {
    this.bsRangeValue = [this.minimumDate, this.currentDate];
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadExpensesOnInit();
    this.loadAssets();
  }

  initializeForm() {
    this.expenseForm = this.fb.group({
      assetId: ['', Validators.required],
      purchaseDate: ['', Validators.required],
      amount: ['', Validators.required],
    })
  }


  loadExpensesOnInit() {
    this.activatedRoute.data.subscribe(data => {
      const resolvedData = data.expenses;
      if (resolvedData) {
        this.expenses = resolvedData.result;
        this.pagination = resolvedData.pagination;
      }
    });

    this.expenseService.getExpensesSum().subscribe(sum => {
      this.totalExpensesSum = sum;
    })
  }

  loadExpenses() {
    this.expenseService.getExpenses(this.pageNumber, this.pageSize).subscribe({
      next: response => {
        if (response.result && response.pagination) {
          this.expenses = response.result;
          this.pagination = response.pagination;
        }
      }
    })

    this.expenseService.getExpensesSum().subscribe(sum => {
      this.totalExpensesSum = sum;
    })
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
    this.activatedRoute.data.subscribe((data) => {
      this.assets = data?.assets;
      this.selectedAsset = this.assets[0];
    });
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadExpenses();
    }
  }

  itemsPerPageChanged(event: any) {
    if (this.pageSize !== event) {
      this.pageSize = event;
      this.loadExpenses();
    }
  }
}
