import { Component, OnInit, Output, EventEmitter } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

import { FoodService } from "../../services/food.service"
import { Food, MealType } from "../../models/food.model"

@Component({
  selector: "app-add-food",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6">
      <!-- Search Section -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Buscar Alimento
        </label>
        <div class="relative">
          <input
            type="text"
            [(ngModel)]="searchQuery"
            (input)="onSearchChange()"
            placeholder="Digite o nome do alimento (ex: peito de frango, arroz integral...)"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
          <i class="pi pi-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
        
        <!-- Search Results -->
        <div *ngIf="searchQuery && filteredFoods.length > 0" 
             class="mt-2 max-h-60 overflow-y-auto border border-gray-200 rounded-lg bg-white shadow-lg">
          <div *ngFor="let food of filteredFoods" 
               class="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
               (click)="selectFood(food)">
            <div class="flex justify-between items-center">
              <div>
                <div class="font-semibold text-gray-800">{{ food.name }}</div>
                <div class="text-sm text-gray-600">{{ food.category }}</div>
              </div>
              <div class="text-right">
                <div class="font-bold text-green-600">{{ food.nutritionPer100g.calories }} cal</div>
                <div class="text-xs text-gray-500">por 100g</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Selected Food Details -->
      <div *ngIf="selectedFood" class="space-y-6">
        <!-- Food Header -->
        <div class="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-2xl font-bold mb-2">{{ selectedFood.name }}</h3>
              <span class="bg-white/20 px-3 py-1 rounded-full text-sm">
                {{ selectedFood.category }}
              </span>
            </div>
            <div class="text-right">
              <div class="text-3xl font-bold">{{ selectedFood.nutritionPer100g.calories }}</div>
              <div class="text-sm opacity-90">kcal/100g</div>
            </div>
          </div>
        </div>

        <div class="grid lg:grid-cols-2 gap-8">
          <!-- Left Column - Controls -->
          <div class="space-y-6">
            <!-- Serving Size Selection -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Porção Sugerida
              </label>
              <select
                [(ngModel)]="selectedServing"
                (change)="onServingChange()"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                <option value="">Selecione uma porção</option>
                <option *ngFor="let serving of servingOptions" [ngValue]="serving">
                  {{ serving.label }}
                </option>
              </select>
            </div>

            <!-- Custom Amount -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Quantidade Personalizada (gramas)
              </label>
              <input
                type="number"
                [(ngModel)]="customAmount"
                (input)="calculateNutrition()"
                min="1"
                max="2000"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
              <p class="mt-1 text-sm text-gray-600">
                Ajuste a quantidade em gramas para calcular os macros exatos
              </p>
            </div>

            <!-- Meal Selection -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Refeição
              </label>
              <select
                [(ngModel)]="selectedMeal"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                <option *ngFor="let meal of mealOptions" [value]="meal.value">
                  {{ meal.label }}
                </option>
              </select>
            </div>
          </div>

          <!-- Right Column - Nutrition Preview -->
          <div>
            <h4 class="text-lg font-semibold text-gray-800 mb-4">
              Informações Nutricionais
            </h4>
            
            <!-- Calories Card -->
            <div class="bg-blue-50 rounded-xl p-4 mb-4 border border-blue-200">
              <div class="flex justify-between items-center">
                <span class="font-semibold text-blue-800">Calorias</span>
                <div class="text-right">
                  <div class="text-2xl font-bold text-blue-600">{{ calculatedNutrition.calories }}</div>
                  <div class="text-sm text-blue-600">kcal</div>
                </div>
              </div>
            </div>

            <!-- Macros Grid -->
            <div class="grid grid-cols-3 gap-3 mb-4">
              <div class="bg-green-50 rounded-xl p-4 text-center border border-green-200">
                <div class="text-lg font-bold text-green-600">{{ calculatedNutrition.protein.toFixed(1) }}g</div>
                <div class="text-xs text-green-700 font-medium">Proteínas</div>
              </div>
              <div class="bg-orange-50 rounded-xl p-4 text-center border border-orange-200">
                <div class="text-lg font-bold text-orange-600">{{ calculatedNutrition.carbs.toFixed(1) }}g</div>
                <div class="text-xs text-orange-700 font-medium">Carboidratos</div>
              </div>
              <div class="bg-red-50 rounded-xl p-4 text-center border border-red-200">
                <div class="text-lg font-bold text-red-600">{{ calculatedNutrition.fat.toFixed(1) }}g</div>
                <div class="text-xs text-red-700 font-medium">Gorduras</div>
              </div>
            </div>

            <!-- Additional Nutrients -->
            <div class="bg-gray-50 rounded-xl p-4 space-y-3">
              <h5 class="font-semibold text-gray-700 text-sm uppercase tracking-wide">Outros Nutrientes</h5>
              
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Fibras</span>
                <span class="font-semibold text-gray-800">{{ calculatedNutrition.fiber.toFixed(1) }}g</span>
              </div>
              
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Açúcares</span>
                <span class="font-semibold text-gray-800">{{ calculatedNutrition.sugar.toFixed(1) }}g</span>
              </div>
              
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Sódio</span>
                <span class="font-semibold text-gray-800">{{ calculatedNutrition.sodium }}mg</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end gap-4 pt-6 border-t border-gray-200">
          <button
            class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            (click)="onCancel()">
            Cancelar
          </button>
          
          <button
            class="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            [disabled]="!canAdd()"
            (click)="onAdd()">
            Adicionar à Dieta
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div *ngIf="!selectedFood && !searchQuery" class="text-center py-12">
        <i class="pi pi-search text-4xl text-gray-400 mb-4"></i>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Busque por um alimento</h3>
        <p class="text-gray-600">Digite o nome do alimento que você consumiu para começar</p>
      </div>
    </div>
  `,
})
export class AddFoodComponent implements OnInit {
  @Output() foodAdded = new EventEmitter<void>()
  @Output() cancel = new EventEmitter<void>()

  searchQuery = ""
  selectedFood: Food | null = null
  filteredFoods: Food[] = []
  selectedServing: any = null
  customAmount = 100
  selectedMeal: MealType = MealType.BREAKFAST

  servingOptions: any[] = []
  mealOptions = [
    { label: "🌅 Café da Manhã", value: MealType.BREAKFAST },
    { label: "☀️ Almoço", value: MealType.LUNCH },
    { label: "🌙 Jantar", value: MealType.DINNER },
    { label: "🍎 Lanche", value: MealType.SNACK },
  ]

  calculatedNutrition = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    sugar: 0,
    sodium: 0,
  }

  constructor(private foodService: FoodService) {}

  ngOnInit() {
    this.calculateNutrition()
  }

  onSearchChange() {
    if (this.searchQuery.length >= 2) {
      this.foodService.searchFoods(this.searchQuery).subscribe((foods) => {
        this.filteredFoods = foods
      })
    } else {
      this.filteredFoods = []
    }
  }

  selectFood(food: Food) {
    this.selectedFood = food
    this.searchQuery = food.name
    this.filteredFoods = []
    this.setupServingOptions()
    this.calculateNutrition()
  }

  onServingChange() {
    if (this.selectedServing) {
      this.customAmount = this.selectedServing.grams
      this.calculateNutrition()
    }
  }

  private setupServingOptions() {
    if (this.selectedFood) {
      this.servingOptions = [
        { label: "100g (padrão)", grams: 100 },
        ...this.selectedFood.servingSizes.map((serving) => ({
          label: `${serving.name} (${serving.grams}g)`,
          grams: serving.grams,
        })),
      ]
    }
  }

  calculateNutrition() {
    if (!this.selectedFood || !this.customAmount) {
      this.calculatedNutrition = {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        sugar: 0,
        sodium: 0,
      }
      return
    }

    const factor = this.customAmount / 100
    const nutrition = this.selectedFood.nutritionPer100g

    this.calculatedNutrition = {
      calories: Math.round(nutrition.calories * factor),
      protein: Math.round(nutrition.protein * factor * 10) / 10,
      carbs: Math.round(nutrition.carbs * factor * 10) / 10,
      fat: Math.round(nutrition.fat * factor * 10) / 10,
      fiber: Math.round(nutrition.fiber * factor * 10) / 10,
      sugar: Math.round(nutrition.sugar * factor * 10) / 10,
      sodium: Math.round(nutrition.sodium * factor),
    }
  }

  canAdd(): boolean {
    return !!(this.selectedFood && this.customAmount > 0 && this.selectedMeal)
  }

  onAdd() {
    if (this.canAdd() && this.selectedFood) {
      this.foodService.addFoodEntry(this.selectedFood.id, this.customAmount, this.selectedMeal)
      this.foodAdded.emit()
      this.resetForm()
    }
  }

  onCancel() {
    this.cancel.emit()
    this.resetForm()
  }

  private resetForm() {
    this.searchQuery = ""
    this.selectedFood = null
    this.selectedServing = null
    this.customAmount = 100
    this.selectedMeal = MealType.BREAKFAST
    this.servingOptions = []
    this.filteredFoods = []
    this.calculateNutrition()
  }
}
