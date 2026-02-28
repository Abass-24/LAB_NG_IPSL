import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Produit } from '../../models/produit.model';
import { Categorie } from '../../models/categorie.model';
import { ProduitService } from '../../services/produit-service.service';
import { CategorieService } from '../../services/categorie-service.service';

@Component({
    selector: 'app-produit-details',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './produit-details.html'
})
export class ProduitDetails implements OnInit {
    produit: Produit | null = null;
    categories: Categorie[] = [];
    loading = false;

    constructor(
        private route: ActivatedRoute,
        private produitService: ProduitService,
        private categorieService: CategorieService
    ) {}

    ngOnInit(): void {
        this.loadCategories();
        this.loadProduit();
    }

    loadCategories(): void {
        this.categorieService.getAll().subscribe({
            next: (data) => {
                this.categories = data;
            }
        });
    }

    loadProduit(): void {
        this.loading = true;
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.produitService.getById(+id).subscribe({
                next: (data) => {
                    this.produit = data || null;
                    this.loading = false;
                },
                error: () => {
                    this.loading = false;
                }
            });
        }
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
}