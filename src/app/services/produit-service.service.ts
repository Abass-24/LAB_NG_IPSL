import { delay, Observable, of } from "rxjs";
import { PRODUITS } from "../data/produit.data";
import { Produit } from "../models/produit.model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  private produits: Produit[] = PRODUITS;

  getAll(): Observable<Produit[]> {
    return of(this.produits).pipe(delay(50000));
  }

  getById(id: number): Observable<Produit | undefined> {
    return of(this.produits.find(p => p.id === id)).pipe(delay(500));
  }

  add(produit: Produit): Observable<Produit> {
    produit.id = Date.now();
    this.produits.push(produit);
    return of(produit).pipe(delay(500));
  }

  update(produit: Produit): Observable<Produit> {
    const index = this.produits.findIndex(p => p.id === produit.id);
    this.produits[index] = produit;
    return of(produit).pipe(delay(500));
  }

  delete(id: number): Observable<boolean> {
    this.produits = this.produits.filter(p => p.id !== id);
    return of(true).pipe(delay(500));
  }
}
