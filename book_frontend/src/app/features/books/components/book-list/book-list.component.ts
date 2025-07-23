import { Component, OnDestroy, OnInit } from '@angular/core';
   import { BookService } from '../../../../core/api/books.service';
   import { Router, ActivatedRoute, RouterLink } from '@angular/router';
   import { BehaviorSubject, Observable } from 'rxjs';
   import { map, switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

   @Component({
     selector: 'app-book-list',
     standalone: true,
     imports: [CommonModule, RouterLink],
     templateUrl: './book-list.component.html',
     styleUrls: ['./book-list.component.scss']
   })
   export class BookListComponent implements OnInit, OnDestroy {
     private booksSubject = new BehaviorSubject<any[]>([]);
     books$ = this.booksSubject.asObservable();

     constructor(
       private bookService: BookService,
       private router: Router,
       private route: ActivatedRoute
     ) {}
     ngOnDestroy(): void {
       // Cleanup
       this.booksSubject.complete();
     }
     ngOnInit(): void {
       // Initial load
       this.bookService.getBooks().subscribe(books => {
         this.booksSubject.next(books);
       });
     }

     editBook(id: number): void {
       this.router.navigate(['book-form', id], { relativeTo: this.route });
     }

     deleteBook(id: number): void {
       if (confirm('Are you sure you want to delete this book?')) {
         this.bookService.deleteBook(id).pipe(
           switchMap(() => this.bookService.getBooks())
         ).subscribe({
           next: (updatedBooks) => {
             this.booksSubject.next(updatedBooks);
           },
           error: (err) => {
             console.error('Error deleting book:', err);
           }
         });
       }
     }
   }