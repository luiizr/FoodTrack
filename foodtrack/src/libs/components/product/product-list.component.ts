import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'product-list',
  standalone: true,
  imports: [CommonModule, ButtonModule, DecimalPipe],
  template: `
    <div class="bg-white rounded-2xl shadow-lg p-8">
      <div class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 class="text-2xl font-bold text-gray-800">Alimentos</h2>
        <button pButton type="button" label="Adicionar" icon="pi pi-plus" class="p-button-success p-button-lg" (click)="addProduct.emit()"></button>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Nome</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Proteínas (g)</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Carboidratos (g)</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Gorduras (g)</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Calorias</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr *ngFor="let product of products" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">{{ product.nome }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-blue-700 font-semibold">{{ product.proteinas }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-green-700 font-semibold">{{ product.carboidratos }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-yellow-700 font-semibold">{{ product.gorduras }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-red-700 font-semibold">{{ product.calorias }}</td>
              <td class="px-6 py-4 whitespace-nowrap flex gap-2">
                <button pButton type="button" icon="pi pi-eye" class="p-button-rounded p-button-info p-button-sm" (click)="selectProduct.emit(product)" title="Detalhar"></button>
                <button pButton type="button" icon="pi pi-pencil" class="p-button-rounded p-button-warning p-button-sm" (click)="editProduct.emit(product)" title="Editar"></button>
                <button pButton type="button" icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-sm" (click)="deleteProduct.emit(product)" title="Excluir"></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class ProductListComponent {
  @Input() products: any[] = [];
  @Output() selectProduct = new EventEmitter<any>();
  @Output() addProduct = new EventEmitter<void>();
  @Output() editProduct = new EventEmitter<any>();
  @Output() deleteProduct = new EventEmitter<any>();
} 