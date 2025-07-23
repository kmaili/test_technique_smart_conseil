import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDashboardComponent } from './pages/book-dashboard/book-dashboard.component';

const routes: Routes = [
  { path: '', component: BookDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }