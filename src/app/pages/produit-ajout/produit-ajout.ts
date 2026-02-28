import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProduitService } from '../../services/produit-service.service';
import { CategorieService } from '../../services/categorie-service.service';
import { Categorie } from '../../models/categorie.model';

@Component({
    selector: 'app-produit-ajout',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink, CommonModule],
    templateUrl: './produit-ajout.html'
})
export class ProduitAjout implements OnInit {
    produitForm: FormGroup;
    isEditMode = false;
    produitId: number | null = null;
    categories: Categorie[] = [];

    constructor(
        private fb: FormBuilder,
        private produitService: ProduitService,
        private categorieService: CategorieService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.produitForm = this.fb.group({
            nom: ['', Validators.required],
            prix: [0, [Validators.required, Validators.min(0)]],
            quantite: [0, [Validators.required, Validators.min(0)]],
            description: [''],
            categories: [[]]
        });
    }

    ngOnInit(): void {
        this.loadCategories();
        
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode = true;
            this.produitId = +id;
            this.loadProduit();
        }
    }

    loadCategories(): void {
        this.categorieService.getAll().subscribe({
            next: (data) => {
                this.categories = data;
            }
        });
    }

    loadProduit(): void {
        if (this.produitId) {
            this.produitService.getById(this.produitId).subscribe({
                next: (produit) => {
                    if (produit) {
                        this.produitForm.patchValue({
                            nom: produit.nom,
                            prix: produit.prix,
                            quantite: produit.quantite,
                            description: produit.description,
                            categories: produit.categories || []
                        });
                    }
                }
            });
        }
    }

    onSubmit(): void {
        if (this.produitForm.invalid) {
            // Marquer tous les champs comme touchés pour afficher les erreurs
            Object.keys(this.produitForm.controls).forEach(key => {
            this.produitForm.get(key)?.markAsTouched();
            });
            return;
        }

        if (this.produitForm.valid) {
            const produit = this.produitForm.value;
            
            if (this.isEditMode && this.produitId) {
                this.produitService.update({ ...produit, id: this.produitId }).subscribe({
                    next: () => {
                        this.router.navigate(['/produits']);
                    }
                });
            } else {
                this.produitService.add(produit).subscribe({
                    next: () => {
                        this.router.navigate(['/produits']);
                    }
                });
            }
        }
    }
}