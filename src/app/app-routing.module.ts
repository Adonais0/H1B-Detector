import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'company-list/:query', loadChildren: './company-list/company-list.module#CompanyListPageModule' },
  { path: 'job-list/:query', loadChildren: './job-list/job-list.module#JobListPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'company-detail/:id', loadChildren: './company-detail/company-detail.module#CompanyDetailPageModule' },
  { path: 'job-detail/:id', loadChildren: './job-detail/job-detail.module#JobDetailPageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
