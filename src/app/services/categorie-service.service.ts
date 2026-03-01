import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Categorie } from '../models/categorie.model';

// Comment out mock data import
// import { CATEGORIES } from '../data/categorie.data';

@Injectable({
    providedIn: 'root'
})
export class CategorieService {
    private apiUrl = 'http://localhost:8080/api/categories';
    // private categories: Categorie[] = CATEGORIES; // replaced by backend

    constructor(private http: HttpClient) {}

    getAll(): Observable<Categorie[]> {
        return this.http.get<Categorie[]>(this.apiUrl).pipe(
            map(data => data.map(item => ({ ...item, createdAt: new Date(item.createdAt) }))),
            catchError(this.handleError)
        );
    }

    getById(id: number): Observable<Categorie> {
        return this.http.get<Categorie>(`${this.apiUrl}/${id}`).pipe(
            map(item => ({ ...item, createdAt: new Date(item.createdAt) })),
            catchError(this.handleError)
        );
    }

    add(categorie: Categorie): Observable<Categorie> {
        return this.http.post<Categorie>(this.apiUrl, categorie).pipe(
            map(item => ({ ...item, createdAt: new Date(item.createdAt) })),
            catchError(this.handleError)
        );
    }

    update(categorie: Categorie): Observable<Categorie> {
        return this.http.put<Categorie>(`${this.apiUrl}/${categorie.id}`, categorie).pipe(
            map(item => ({ ...item, createdAt: new Date(item.createdAt) })),
            catchError(this.handleError)
        );
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'An error occurred';
        if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(() => new Error(errorMessage));
    }
}