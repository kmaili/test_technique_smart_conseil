import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = `${environment.backendUrl || 'http://127.0.0.1:8000/api'}/books/`;

  constructor(private http: HttpClient) {}

  
  /**
   * Retrieve all books from the API.
   * @returns Observable containing an array of books.
   */
  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  /**
   * Retrieve a single book from the API, given its ID.
   * @param id The ID of the book to retrieve.
   * @returns Observable containing the book.
   */
  getBook(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}/`);
  }

  /**
   * Create a new book and add it to the API.
   * @param book The book to add.
   * @returns Observable containing the newly added book.
   */
  addBook(book: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, book);
  }

  /**
   * Update a book in the API, given its ID and the new data.
   * @param id The ID of the book to update.
   * @param book The new data for the book.
   * @returns Observable containing the updated book.
   */
  updateBook(id: number, book: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}/`, book);
  }

  /**
   * Delete a book from the API, given its ID.
   * @param id The ID of the book to delete.
   * @returns Observable for the HTTP delete request.
   */

  deleteBook(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}/`);
  }
}