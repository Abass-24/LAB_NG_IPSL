import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { Categorie } from '../../models/categorie.model';
import { CategorieService } from '../../services/categorie-service.service';
import { ProduitService } from '../../services/produit-service.service';

@Component({
    selector: 'app-categorie-list',
    standalone: true,
    imports: [RouterLink, CommonModule, DatePipe],
    templateUrl: './categorie-list.html'
})
export class CategorieList implements OnInit {
    categories: Categorie[] = [];
    loading = false;
    errorMessage = '';
    categorieToDelete: Categorie | null = null;

    constructor(
        private categorieService: CategorieService,
        private produitService: ProduitService
    ) {}

    ngOnInit(): void {
        this.loadCategories();
    }

    loadCategories(): void {
        this.loading = true;
        this.categorieService.getAll().subscribe({
            next: (data) => {
                this.categories = data;
                this.loading = false;
            },
            error: (err) => {
                this.errorMessage = 'Erreur lors du chargement des catégories';
                this.loading = false;
            }
        });
    }

    openDeleteModal(categorie: Categorie): void {
        this.categorieToDelete = categorie;
    }

    hasProductsInCategory(): boolean {
        if (!this.categorieToDelete) return false;
        // À implémenter avec la logique réelle
        return false;
    }

    deleteCategorie(): void {
        if (this.categorieToDelete?.id) {
            this.categorieService.delete(this.categorieToDelete.id).subscribe({
                next: () => {
                    this.loadCategories();
                },
                error: (err) => {
                    this.errorMessage = 'Erreur lors de la suppression';
                }
            });
        }
    }
}