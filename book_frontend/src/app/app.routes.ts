import { Routes } from '@angular/router';
   import { BookDashboardComponent } from './features/books/pages/book-dashboard/book-dashboard.component';
   import { BookFormComponent } from './features/books/components/book-form/book-form.component';
   import { BookListComponent } from './features/books/components/book-list/book-list.component';

   export const routes: Routes = [
     { path: '', redirectTo: '/book-dashboard', pathMatch: 'full' },
     {
       path: 'book-dashboard',
       component: BookDashboardComponent,
       children: [
         { path: '', component: BookListComponent },
         { path: 'book-form', component: BookFormComponent },
         { path: 'book-form/:id', component: BookFormComponent }
       ]
     }
   ];