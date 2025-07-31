import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <div>
      <h3>Lista de Produtos</h3>
      <p>Componente de lista de produtos</p>
    </div>
  `
})
export class ProductListComponent {

} 