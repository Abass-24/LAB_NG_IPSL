import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Categorie } from '../../models/categorie.model';
import { Produit } from '../../models/produit.model';
import { CategorieService } from '../../services/categorie-service.service';
import { ProduitService } from '../../services/produit-service.service';

@Component({
    selector: 'app-categorie-details',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './categorie-details.html'
})
export class CategorieDetails implements OnInit {
    categorie: Categorie | null = null;
    produitsDansCategorie: Produit[] = [];
    loading = false;

    constructor(
        private route: ActivatedRoute,
        private categorieService: CategorieService,
        private produitService: ProduitService
    ) {}

    ngOnInit(): void {
        this.loadCategorie();
    }

    loadCategorie(): void {
        this.loading = true;
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.categorieService.getById(+id).subscribe({
                next: (data) => {
                    this.categorie = data || null;
                    if (this.categorie?.id) {
                        this.loadProduitsAssocies(this.categorie.id);
                    }
                    this.loading = false;
                },
                error: () => {
                    this.loading = false;
                }
            });
        }
    }

    loadProduitsAssocies(categorieId: number): void {
        this.produitService.getAll().subscribe({
            next: (produits) => {
                this.produitsDansCategorie = produits.filter(p => 
                    p.categories?.includes(categorieId)
                );
            }
        });
    }

    getStockClass(quantite: number): string {
        if (quantite <= 0) return 'badge bg-danger';
        if (quantite < 10) return 'badge bg-warning';
        return 'badge bg-success';
    }
}