import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";
import { PRODUITS } from "../data/produit.data";
import { Produit } from "../models/produit.model";

@Injectable({
    providedIn: 'root',
})
export class ProduitService {
    private produits: Produit[] = PRODUITS;

    getAll(): Observable<Produit[]> {
        return of(this.produits).pipe(delay(800));
    }

    getById(id: number): Observable<Produit | undefined> {
        return of(this.produits.find(p => p.id === id)).pipe(delay(400));
    }

    add(produit: Produit): Observable<Produit> {
        const maxId = Math.max(...this.produits.map(p => p.id || 0), 0);
        produit.id = maxId + 1;
        produit.createdAt = new Date();
        produit.updatedAt = new Date();
        this.produits.push(produit);
        return of(produit).pipe(delay(400));
    }

    update(produit: Produit): Observable<Produit> {
        const index = this.produits.findIndex(p => p.id === produit.id);
        if (index !== -1) {
            produit.updatedAt = new Date();
            this.produits[index] = { ...this.produits[index], ...produit };
        }
        return of(produit).pipe(delay(400));
    }

    delete(id: number): Observable<boolean> {
        this.produits = this.produits.filter(p => p.id !== id);
        return of(true).pipe(delay(400));
    }
}