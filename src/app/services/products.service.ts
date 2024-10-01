import { Injectable } from '@angular/core';
import { Product } from '../products/product';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly storageKey = 'products';
  getAllProducts(): Product[] {
    const storedProducts = localStorage.getItem(this.storageKey);
    return storedProducts ? JSON.parse(storedProducts) : [];
  }
  getProductById(id: number): Product | undefined {
    return this.getAllProducts().find(product => product.id === id);
  }
  saveProduct(product: Product): void {
    const products = this.getAllProducts();
    if (!product.id) {
      product.id = this.generateProductId();
      products.push(product);
    } else {
      const existingProductIndex = products.findIndex(p => p.id === product.id);
      if (existingProductIndex !== -1) {
        products[existingProductIndex] = product;
      }
    }
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }
  deleteProduct(id: number): void {
    const products = this.getAllProducts();
    const updatedProducts = products.filter(product => product.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(updatedProducts));
  }
  private generateProductId(): number {
    return Math.floor(Math.random() * 1000);
  }
}
