import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Produit } from '../../models/produit.model';
import { Categorie } from '../../models/categorie.model';
import { ProduitService } from '../../services/produit-service.service';
import { CategorieService } from '../../services/categorie-service.service';

@Component({
    selector: 'app-produit-list',
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: './produit-list.html',
    styleUrls: ['./produit-list.scss']
})
export class ProduitList implements OnInit {
    produits: Produit[] = [];
    filteredProduits: Produit[] = [];
    categories: Categorie[] = [];
    loading = false;
    errorMessage = '';
    produitToDelete: Produit | null = null;
    searchTerm = '';
    selectedCategory = '';

    constructor(
        private produitService: ProduitService,
        private categorieService: CategorieService
    ) {}

    ngOnInit(): void {
        this.loadCategories();
        this.loadProduits();
    }

    loadCategories(): void {
        this.categorieService.getAll().subscribe({
            next: (data) => {
                this.categories = data;
            }
        });
    }

    loadProduits(): void {
        this.loading = true;
        this.produitService.getAll().subscribe({
            next: (data) => {
                this.produits = data;
                this.applyFilters();
                this.loading = false;
            },
            error: (err) => {
                this.errorMessage = 'Erreur lors du chargement des produits';
                this.loading = false;
            }
        });
    }

    getCategorieName(categorieId: number): string {
        const cat = this.categories.find(c => c.id === categorieId);
        return cat ? cat.nom : 'Inconnue';
    }

    getStockClass(quantite: number): string {
        if (quantite <= 0) return 'badge bg-danger';
        if (quantite < 10) return 'badge bg-warning';
        return 'badge bg-success';
    }

    onSearch(event: any): void {
        this.searchTerm = event.target.value.toLowerCase();
        this.applyFilters();
    }

    onCategoryFilter(event: any): void {
        this.selectedCategory = event.target.value;
        this.applyFilters();
    }

    applyFilters(): void {
        this.filteredProduits = this.produits.filter(produit => {
            const matchesSearch = produit.nom.toLowerCase().includes(this.searchTerm);
            const matchesCategory = !this.selectedCategory || 
                (produit.categories && produit.categories.includes(+this.selectedCategory));
            return matchesSearch && matchesCategory;
        });
    }

    openDeleteModal(produit: Produit): void {
        this.produitToDelete = produit;
    }

    deleteProduit(): void {
        if (this.produitToDelete?.id) {
            this.produitService.delete(this.produitToDelete.id).subscribe({
                next: () => {
                    this.loadProduits();
                },
                error: (err) => {
                    this.errorMessage = 'Erreur lors de la suppression';
                }
            });
        }
    }
}