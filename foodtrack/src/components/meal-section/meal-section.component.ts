import { Component, Input, Output, EventEmitter } from "@angular/core"
import { CommonModule } from "@angular/common"

import type { FoodEntry, MealType } from "../../models/food.model"

@Component({
  selector: "app-meal-section",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-4">
      <div *ngIf="entries.length === 0" class="text-center py-12 text-gray-500">
        <i class="pi pi-inbox text-4xl mb-4 block text-gray-300"></i>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Nenhum alimento adicionado</h3>
        <p class="text-gray-600">Adicione alimentos para esta refeição para começar o acompanhamento</p>
      </div>

      <div *ngFor="let entry of entries" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-3">
              <h4 class="text-lg font-semibold text-gray-800">{{ entry.food.name }}</h4>
              <span class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                {{ entry.food.category }}
              </span>
            </div>
            
            <div class="text-sm text-gray-600 mb-4">
              <i class="pi pi-calculator mr-1"></i>
              {{ entry.servingSize }}g
            </div>

            <!-- Nutrition Info -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="text-center bg-blue-50 rounded-lg p-3">
                <div class="text-xl font-bold text-blue-600">{{ entry.nutrition.calories }}</div>
                <div class="text-xs text-gray-600 font-medium">kcal</div>
              </div>
              <div class="text-center bg-green-50 rounded-lg p-3">
                <div class="text-xl font-bold text-green-600">{{ entry.nutrition.protein.toFixed(1) }}g</div>
                <div class="text-xs text-gray-600 font-medium">Proteína</div>
              </div>
              <div class="text-center bg-orange-50 rounded-lg p-3">
                <div class="text-xl font-bold text-orange-600">{{ entry.nutrition.carbs.toFixed(1) }}g</div>
                <div class="text-xs text-gray-600 font-medium">Carboidrato</div>
              </div>
              <div class="text-center bg-red-50 rounded-lg p-3">
                <div class="text-xl font-bold text-red-600">{{ entry.nutrition.fat.toFixed(1) }}g</div>
                <div class="text-xs text-gray-600 font-medium">Gordura</div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-2 ml-6">
            <button
              class="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Editar"
              (click)="onEdit(entry)">
              <i class="pi pi-pencil"></i>
            </button>
            
            <button
              class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Excluir"
              (click)="confirmDelete(entry)">
              <i class="pi pi-trash"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Meal Summary -->
      <div *ngIf="entries.length > 0" class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 mt-6">
        <h5 class="text-lg font-semibold text-gray-800 mb-4">
          <i class="pi pi-chart-bar mr-2 text-green-600"></i>
          Resumo da Refeição
        </h5>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-600 mb-1">{{ getTotalCalories() }}</div>
            <div class="text-sm text-gray-600 font-medium">Total de Calorias</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-green-600 mb-1">{{ getTotalProtein().toFixed(1) }}g</div>
            <div class="text-sm text-gray-600 font-medium">Total de Proteínas</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-orange-600 mb-1">{{ getTotalCarbs().toFixed(1) }}g</div>
            <div class="text-sm text-gray-600 font-medium">Total de Carboidratos</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-red-600 mb-1">{{ getTotalFat().toFixed(1) }}g</div>
            <div class="text-sm text-gray-600 font-medium">Total de Gorduras</div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class MealSectionComponent {
  @Input() entries: FoodEntry[] = []
  @Input() mealType!: MealType
  @Output() editEntry = new EventEmitter<FoodEntry>()
  @Output() deleteEntry = new EventEmitter<string>()

  onEdit(entry: FoodEntry) {
    this.editEntry.emit(entry)
  }

  confirmDelete(entry: FoodEntry) {
    if (confirm(`Tem certeza que deseja excluir "${entry.food.name}" desta refeição?`)) {
      this.deleteEntry.emit(entry.id)
    }
  }

  getTotalCalories(): number {
    return this.entries.reduce((total, entry) => total + entry.nutrition.calories, 0)
  }

  getTotalProtein(): number {
    return this.entries.reduce((total, entry) => total + entry.nutrition.protein, 0)
  }

  getTotalCarbs(): number {
    return this.entries.reduce((total, entry) => total + entry.nutrition.carbs, 0)
  }

  getTotalFat(): number {
    return this.entries.reduce((total, entry) => total + entry.nutrition.fat, 0)
  }
}
