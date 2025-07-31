import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'product-crud',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto py-8">
      <h2>Gerenciamento de Produtos</h2>
      <p>Componente de CRUD de produtos</p>
    </div>
  `
})
export class ProductCrudComponent {
  products = [
    { id: 1, nome: 'Banana', proteinas: 1.1, carboidratos: 22.8, gorduras: 0.3, calorias: 96, descricao: 'Banana nanica' },
    { id: 2, nome: 'Maçã', proteinas: 0.3, carboidratos: 13.8, gorduras: 0.2, calorias: 52, descricao: 'Maçã gala' }
  ];
} 