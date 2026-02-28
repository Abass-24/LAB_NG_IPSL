import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategorieService } from '../../services/categorie-service.service';

@Component({
    selector: 'app-categorie-ajout',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink, CommonModule],
    templateUrl: './categorie-ajout.html'
})
export class CategorieAjout implements OnInit {
    categorieForm: FormGroup;
    isEditMode = false;
    categorieId: number | null = null;

    constructor(
        private fb: FormBuilder,
        private categorieService: CategorieService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.categorieForm = this.fb.group({
            nom: ['', Validators.required],
            description: ['']
        });
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode = true;
            this.categorieId = +id;
            this.loadCategorie();
        }
    }

    loadCategorie(): void {
        if (this.categorieId) {
            this.categorieService.getById(this.categorieId).subscribe({
                next: (categorie) => {
                    if (categorie) {
                        this.categorieForm.patchValue({
                            nom: categorie.nom,
                            description: categorie.description
                        });
                    }
                }
            });
        }
    }

    onSubmit(): void {
        if (this.categorieForm.valid) {
            const categorie = this.categorieForm.value;
            
            if (this.isEditMode && this.categorieId) {
                this.categorieService.update({ ...categorie, id: this.categorieId }).subscribe({
                    next: () => {
                        this.router.navigate(['/categories']);
                    }
                });
            } else {
                this.categorieService.add(categorie).subscribe({
                    next: () => {
                        this.router.navigate(['/categories']);
                    }
                });
            }
        }
    }
}