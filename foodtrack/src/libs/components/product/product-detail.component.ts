import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, DialogModule],
  template: `
    <div>
      <h3>Detalhes do Produto</h3>
      <p>Componente de detalhes do produto</p>
    </div>
  `
})
export class ProductDetailComponent {

} 