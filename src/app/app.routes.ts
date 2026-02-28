import { Routes } from '@angular/router';

import { ProduitAjout } from './pages/produit-ajout/produit-ajout';
import { ProduitList } from './pages/produit-list/produit-list';
import { ProduitModifier } from './pages/produit-modifier/produit-modifier';
import { ProduitDetails } from './pages/produit-details/produit-details';
import { CategorieList } from './pages/categorie-list/categorie-list';
import { CategorieAjout } from './pages/categorie-ajout/categorie-ajout';
import { CategorieDetails } from './pages/categorie-details/categorie-details';
import { Error404 } from './pages/error404/error404';

export const routes: Routes = [
    { path: '', redirectTo: '/produits', pathMatch: 'full' },
    { path: 'produits', component: ProduitList },
    { path: 'produits/ajout', component: ProduitAjout },
    { path: 'produits/:id', component: ProduitAjout },
    { path: 'produits/:id/details', component: ProduitDetails },
    
    { path: 'categories', component: CategorieList },
    { path: 'categories/ajout', component: CategorieAjout },
    { path: 'categories/:id', component: CategorieAjout },
    { path: 'categories/:id/details', component: CategorieDetails },
    
    { path: '**', component: Error404 }
];