import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Produit } from '../models/produit.model';

// Comment out mock data import
// import { PRODUITS } from '../data/produit.data';

@Injectable({
    providedIn: 'root'
})
export class ProduitService {
    private apiUrl = 'http://localhost:8080/api/produits';
    // private produits: Produit[] = PRODUITS; // replaced by backend

    constructor(private http: HttpClient) {}

    getAll(): Observable<Produit[]> {
        return this.http.get<any[]>(this.apiUrl).pipe(
            map(data => data.map(item => this.transformToProduit(item))),
            catchError(this.handleError)
        );
    }

    getById(id: number): Observable<Produit> {
        return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
            map(item => this.transformToProduit(item)),
            catchError(this.handleError)
        );
    }

    add(produit: Produit): Observable<Produit> {
        const body = this.transformToBackend(produit);
        return this.http.post<any>(this.apiUrl, body).pipe(
            map(item => this.transformToProduit(item)),
            catchError(this.handleError)
        );
    }

    update(produit: Produit): Observable<Produit> {
        const body = this.transformToBackend(produit);
        return this.http.put<any>(`${this.apiUrl}/${produit.id}`, body).pipe(
            map(item => this.transformToProduit(item)),
            catchError(this.handleError)
        );
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
            catchError(this.handleError)
        );
    }

    private transformToProduit(item: any): Produit {
        return {
            ...item,
            createdAt: new Date(item.createdAt),
            updatedAt: new Date(item.updatedAt),
            categories: item.categories ? item.categories.map((c: any) => c.id) : []
        };
    }

    private transformToBackend(produit: Produit): any {
        return {
            ...produit,
            categories: produit.categories ? produit.categories.map(id => ({ id })) : []
        };
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