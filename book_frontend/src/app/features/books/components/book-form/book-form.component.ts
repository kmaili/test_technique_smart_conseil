import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
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
  currentYear: number = new Date().getFullYear();

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Custom validator to restrict special characters
    const noSpecialChars: ValidatorFn = (control: AbstractControl) => {
      const valid = /^[a-zA-Z0-9\s-]+$/.test(control.value);
      return valid ? null : { specialChars: true };
    };

    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100), noSpecialChars]],
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), noSpecialChars]],
      year: ['', [
        Validators.required,
        Validators.min(1000),
        Validators.max(this.currentYear),
        Validators.pattern('^[0-9]{4}$')
      ]]
    });
  }

  ngOnInit(): void {
    // Check if we're editing an existing book
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditing = true;
        this.bookId = +id;
        this.bookService.getBook(this.bookId).subscribe(book => {
          this.bookForm.patchValue(book);
        }, error => {
          console.error('Error fetching book:', error);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const bookData = this.bookForm.value;
      if (this.isEditing && this.bookId) {
        this.bookService.updateBook(this.bookId, bookData).subscribe({
          next: () => this.router.navigate(['/book-dashboard']),
          error: (err) => console.error('Error updating book:', err)
        });
      } else {
        this.bookService.addBook(bookData).subscribe({
          next: () => this.router.navigate(['/book-dashboard']),
          error: (err) => console.error('Error adding book:', err)
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/book-dashboard']);
  }

  // Getter for easy access to form controls
  get f() { return this.bookForm.controls; }
}