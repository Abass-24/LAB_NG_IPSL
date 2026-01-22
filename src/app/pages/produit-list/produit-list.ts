import { Component, OnInit } from '@angular/core';
import { Produit } from '../../models/produit.model';
import { ProduitService } from '../../services/produit-service.service';
import { ProduitItemDiv } from '../produit-item-div/produit-item-div';

@Component({
  selector: 'app-produit-list',
  imports: [ProduitItemDiv],
  templateUrl: './produit-list.html',
  styleUrl: './produit-list.scss',
})
export class ProduitList implements OnInit{
  
  produits: Produit[] = [];


  constructor(private produitService: ProduitService) {  }

  ngOnInit(): void {
    this.loadProduits();
  }

  loadProduits(){
    this.produitService.getAll().subscribe({
      next:(data: Produit[]) => {
        this.produits = data;
      } 
    });
  }


}
