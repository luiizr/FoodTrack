import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductFormComponent } from './product-form.component';

@Component({
  selector: 'product-crud',
  standalone: true,
  imports: [CommonModule, ProductListComponent, ProductDetailComponent, ProductFormComponent],
  template: `
    <div class="container mx-auto py-8">
      <product-list
        [products]="products"
        (selectProduct)="onSelectProduct($event)"
        (addProduct)="onAddProduct()"
        (editProduct)="onEditProduct($event)"
        (deleteProduct)="onDeleteProduct($event)"></product-list>
      <product-detail
        *ngIf="selectedProduct && showDetail"
        [product]="selectedProduct"
        (close)="showDetail = false"></product-detail>
      <product-form
        *ngIf="showForm"
        [product]="editingProduct"
        (save)="onSaveProduct($event)"
        (cancel)="showForm = false"></product-form>
    </div>
  `
})
export class ProductCrudComponent {
  products = [
    { id: 1, nome: 'Banana', proteinas: 1.1, carboidratos: 22.8, gorduras: 0.3, calorias: 96, descricao: 'Banana nanica' },
    { id: 2, nome: 'Maçã', proteinas: 0.3, carboidratos: 13.8, gorduras: 0.2, calorias: 52, descricao: 'Maçã gala' }
  ];
  selectedProduct: any = null;
  editingProduct: any = null;
  showForm = false;
  showDetail = false;

  onSelectProduct(product: any) {
    this.selectedProduct = product;
    this.showDetail = true;
    this.showForm = false;
  }
  onAddProduct() {
    this.editingProduct = null;
    this.showForm = false;
    setTimeout(() => this.showForm = true, 0); // Garante que o dialog abre corretamente
    this.showDetail = false;
  }
  onEditProduct(product: any) {
    this.editingProduct = { ...product };
    this.showForm = false;
    setTimeout(() => this.showForm = true, 0);
    this.showDetail = false;
  }
  onDeleteProduct(product: any) {
    this.products = this.products.filter(p => p.id !== product.id);
  }
  onSaveProduct(product: any) {
    if (product.id) {
      // update
      this.products = this.products.map(p => p.id === product.id ? product : p);
    } else {
      // insert
      product.id = Math.max(...this.products.map(p => p.id), 0) + 1;
      this.products.push(product);
    }
    this.showForm = false;
  }
} 