import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AssetListComponent } from './assets/asset-list/asset-list.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ExpenseListComponent } from './expenses/expense-list/expense-list.component';
import { HomeComponent } from './home/home.component';
import { AdminGuard } from './_guards/admin.guard';
import { AuthGuard } from './_guards/auth.guard';
import { AssetResolver } from './_resolvers/asset/asset.resolver';
import { ExpenseResolver } from './_resolvers/expense/expense.resolver';
import { LearnMoreComponent } from './learn-more/learn-more.component';
import { AboutMeComponent } from './about-me/about-me.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'expenses', component: ExpenseListComponent, resolve: {
          expenses: ExpenseResolver,
          assets: AssetResolver
        }
      },
      {
        path: 'assets', component: AssetListComponent, resolve: {
          assets: AssetResolver
        }
      },
      {
        path: 'admin', component: AdminPanelComponent, canActivate: [AdminGuard]
      }
    ]
  },
  { path: 'errors', component: TestErrorsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: 'learn-more', component: LearnMoreComponent },
  { path: 'about-me', component: AboutMeComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' }, // wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
