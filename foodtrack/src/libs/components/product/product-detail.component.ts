import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'product-detail',
  standalone: true,
  imports: [CommonModule, DialogModule, DecimalPipe],
  template: `
    <p-dialog header="Detalhes do Alimento" [(visible)]="visible" [modal]="true" [closable]="true" (onHide)="close.emit()">
      <div *ngIf="product">
        <h3 class="text-xl font-bold mb-2">{{ product.nome }}</h3>
        <p class="mb-2">Proteínas: <span class="font-semibold">{{ product.proteinas }} g</span></p>
        <p class="mb-2">Carboidratos: <span class="font-semibold">{{ product.carboidratos }} g</span></p>
        <p class="mb-2">Gorduras: <span class="font-semibold">{{ product.gorduras }} g</span></p>
        <p class="mb-2">Calorias: <span class="font-semibold">{{ product.calorias }}</span></p>
        <p class="mb-2">Descrição: {{ product.descricao }}</p>
      </div>
    </p-dialog>
  `
})
export class ProductDetailComponent {
  @Input() product: any;
  @Output() close = new EventEmitter<void>();
  visible = true;
} 