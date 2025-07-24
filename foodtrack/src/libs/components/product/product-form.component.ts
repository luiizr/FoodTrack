import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, DialogModule, InputTextModule, ButtonModule],
  template: `
    <p-dialog header="{{ product ? 'Editar Alimento' : 'Novo Alimento' }}" [(visible)]="visible" [modal]="true" [closable]="true" (onHide)="onCancel()" [style]="{width: '400px'}">
      <form (ngSubmit)="onSubmit()" #form="ngForm" class="space-y-4">
        <div>
          <label class="block font-medium text-gray-700 mb-1">Nome</label>
          <input type="text" pInputText [(ngModel)]="formData.nome" name="nome" required class="w-full border rounded px-3 py-2" placeholder="Nome do alimento" />
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block font-medium text-gray-700 mb-1">Proteínas (g)</label>
            <input type="number" pInputText [(ngModel)]="formData.proteinas" name="proteinas" required class="w-full border rounded px-3 py-2" placeholder="Proteínas" min="0" step="0.01" />
          </div>
          <div>
            <label class="block font-medium text-gray-700 mb-1">Carboidratos (g)</label>
            <input type="number" pInputText [(ngModel)]="formData.carboidratos" name="carboidratos" required class="w-full border rounded px-3 py-2" placeholder="Carboidratos" min="0" step="0.01" />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block font-medium text-gray-700 mb-1">Gorduras (g)</label>
            <input type="number" pInputText [(ngModel)]="formData.gorduras" name="gorduras" required class="w-full border rounded px-3 py-2" placeholder="Gorduras" min="0" step="0.01" />
          </div>
          <div>
            <label class="block font-medium text-gray-700 mb-1">Calorias</label>
            <input type="number" pInputText [(ngModel)]="formData.calorias" name="calorias" required class="w-full border rounded px-3 py-2" placeholder="Calorias" min="0" step="1" />
          </div>
        </div>
        <div>
          <label class="block font-medium text-gray-700 mb-1">Descrição</label>
          <textarea [(ngModel)]="formData.descricao" name="descricao" rows="3" class="w-full border rounded px-3 py-2" placeholder="Descrição"></textarea>
        </div>
        <div class="flex justify-end gap-2 mt-4">
          <button pButton type="button" label="Cancelar" class="p-button-secondary" (click)="onCancel()"></button>
          <button pButton type="submit" label="Salvar" class="p-button-success" [disabled]="form.invalid"></button>
        </div>
      </form>
    </p-dialog>
  `
})
export class ProductFormComponent implements OnInit, OnChanges {
  @Input() product: any;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  visible = true;
  formData: any = { nome: '', proteinas: null, carboidratos: null, gorduras: null, calorias: null, descricao: '' };

  ngOnInit() {
    this.visible = true;
  }

  ngOnChanges() {
    this.formData = this.product ? { ...this.product } : { nome: '', proteinas: null, carboidratos: null, gorduras: null, calorias: null, descricao: '' };
    this.visible = true;
  }

  onSubmit() {
    this.save.emit({ ...this.formData });
    this.visible = false;
  }

  onCancel() {
    this.visible = false;
    this.cancel.emit();
  }
} 