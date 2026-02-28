import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Categorie } from '../models/categorie.model';
import { CATEGORIES } from '../data/categorie.data';

@Injectable({
    providedIn: 'root'
})
export class CategorieService {
    private categories: Categorie[] = CATEGORIES;

    getAll(): Observable<Categorie[]> {
        return of(this.categories).pipe(delay(800));
    }

    getById(id: number): Observable<Categorie | undefined> {
        return of(this.categories.find(c => c.id === id)).pipe(delay(400));
    }

    add(categorie: Categorie): Observable<Categorie> {
        categorie.id = Date.now();
        categorie.createdAt = new Date();
        this.categories.push(categorie);
        return of(categorie).pipe(delay(400));
    }

    update(categorie: Categorie): Observable<Categorie> {
        const index = this.categories.findIndex(c => c.id === categorie.id);
        if (index !== -1) {
            this.categories[index] = { ...this.categories[index], ...categorie };
        }
        return of(categorie).pipe(delay(400));
    }

    delete(id: number): Observable<boolean> {
        this.categories = this.categories.filter(c => c.id !== id);
        return of(true).pipe(delay(400));
    }
}