export interface Produit {
    id?: number;
    nom: string;
    prix: number;
    quantite: number;
    description?: string | null;
    categories?: number[]; // IDs des catégories
    createdAt?: Date;
    updatedAt?: Date;
}