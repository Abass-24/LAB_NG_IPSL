import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProduitItemDiv } from './pages/produit-item-div/produit-item-div';
import { ProduitList } from './pages/produit-list/produit-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProduitList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'LAB_NG_IPSL';
}
