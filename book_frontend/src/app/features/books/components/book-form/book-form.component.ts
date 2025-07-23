import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../../../core/api/books.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  isEditing = false;
  bookId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1000), Validators.max(9999)]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditing = true;
        this.bookId = +id;
        this.bookService.getBook(this.bookId).subscribe(book => {
          this.bookForm.patchValue(book);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const bookData = this.bookForm.value;
      if (this.isEditing && this.bookId) {
        this.bookService.updateBook(this.bookId, bookData).subscribe(() => {
          this.router.navigate(['/book-dashboard']);
        });
      } else {
        this.bookService.addBook(bookData).subscribe(() => {
          this.router.navigate(['/book-dashboard']);
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/book-dashboard']);
  }
}