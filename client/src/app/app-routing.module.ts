import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetListComponent } from './assets/asset-list/asset-list.component';
import { ExpenseListComponent } from './expenses/expense-list/expense-list.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'expenses', component: ExpenseListComponent },
      { path: 'assets', component: AssetListComponent },
    ]
  },
  { path: '**', component: HomeComponent, pathMatch: 'full' }, // wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
