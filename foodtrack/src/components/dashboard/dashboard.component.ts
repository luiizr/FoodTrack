import { Component, type OnInit, Output, EventEmitter } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

// PrimeNG Imports
import { CardModule } from "primeng/card"
import { ButtonModule } from "primeng/button"
import { ProgressBarModule } from "primeng/progressbar"
import { BadgeModule } from "primeng/badge"
import { TooltipModule } from "primeng/tooltip"
import { TabsModule } from "primeng/tabs"
import { DialogModule } from "primeng/dialog"

import { FoodService } from "../../services/food.service"
import { DailyNutrition, MealType } from "../../models/food.model"
import { AddFoodComponent } from "../add-food/add-food.component"
import { MealSectionComponent } from "../meal-section/meal-section.component"

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    ProgressBarModule,
    BadgeModule,
    TooltipModule,
    TabsModule,
    DialogModule,
    AddFoodComponent,
    MealSectionComponent,
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <!-- Header -->
      <div class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center py-6">
            <div class="flex items-center mb-4 md:mb-0">
              <div class="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-3 mr-4">
                <i class="pi pi-chart-line text-white text-2xl"></i>
              </div>
              <div>
                <h1 class="text-3xl font-bold text-gray-800">Dashboard Nutricional</h1>
                <p class="text-gray-600">Acompanhe sua jornada fitness</p>
              </div>
            </div>
            
            <div class="flex items-center gap-4">
              <button 
                class="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                (click)="goBack()">
                <i class="pi pi-arrow-left mr-2"></i>
                Voltar
              </button>
              
              <div class="flex items-center bg-gray-50 rounded-xl px-4 py-2">
                <i class="pi pi-calendar text-gray-500 mr-2"></i>
                <input 
                  type="date" 
                  [(ngModel)]="selectedDateString"
                  (change)="onDateChange()"
                  class="bg-transparent border-none outline-none text-gray-700 font-medium">
              </div>
              
              <button 
                class="flex items-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
                (click)="showAddFoodDialog = true">
                <i class="pi pi-plus mr-2"></i>
                Adicionar Alimento
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Nutrition Summary Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <!-- Calories -->
          <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div class="flex items-center justify-between mb-4">
              <div class="bg-blue-100 rounded-xl p-3">
                <i class="pi pi-bolt text-blue-600 text-xl"></i>
              </div>
              <span class="px-2 py-1 text-xs font-semibold rounded-full" 
                    [class]="getCaloriePercentage() > 100 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'">
                {{ getCaloriePercentage() }}%
              </span>
            </div>
            <div class="text-3xl font-bold text-blue-600 mb-2">
              {{ dailyNutrition.totalCalories }}
            </div>
            <div class="text-sm text-gray-600 mb-3">Calorias</div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                   [style.width.%]="Math.min(getCaloriePercentage(), 100)"></div>
            </div>
            <div class="text-xs text-gray-500 mt-2">Meta: {{ dailyGoals.calories }} kcal</div>
          </div>

          <!-- Protein -->
          <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div class="flex items-center justify-between mb-4">
              <div class="bg-green-100 rounded-xl p-3">
                <i class="pi pi-heart text-green-600 text-xl"></i>
              </div>
              <span class="px-2 py-1 text-xs font-semibold rounded-full" 
                    [class]="getProteinPercentage() > 100 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'">
                {{ getProteinPercentage() }}%
              </span>
            </div>
            <div class="text-3xl font-bold text-green-600 mb-2">
              {{ dailyNutrition.totalProtein.toFixed(1) }}g
            </div>
            <div class="text-sm text-gray-600 mb-3">Proteínas</div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-green-500 h-2 rounded-full transition-all duration-300" 
                   [style.width.%]="Math.min(getProteinPercentage(), 100)"></div>
            </div>
            <div class="text-xs text-gray-500 mt-2">Meta: {{ dailyGoals.protein }}g</div>
          </div>

          <!-- Carbs -->
          <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div class="flex items-center justify-between mb-4">
              <div class="bg-orange-100 rounded-xl p-3">
                <i class="pi pi-sun text-orange-600 text-xl"></i>
              </div>
              <span class="px-2 py-1 text-xs font-semibold rounded-full" 
                    [class]="getCarbsPercentage() > 100 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'">
                {{ getCarbsPercentage() }}%
              </span>
            </div>
            <div class="text-3xl font-bold text-orange-600 mb-2">
              {{ dailyNutrition.totalCarbs.toFixed(1) }}g
            </div>
            <div class="text-sm text-gray-600 mb-3">Carboidratos</div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-orange-500 h-2 rounded-full transition-all duration-300" 
                   [style.width.%]="Math.min(getCarbsPercentage(), 100)"></div>
            </div>
            <div class="text-xs text-gray-500 mt-2">Meta: {{ dailyGoals.carbs }}g</div>
          </div>

          <!-- Fat -->
          <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div class="flex items-center justify-between mb-4">
              <div class="bg-red-100 rounded-xl p-3">
                <i class="pi pi-circle text-red-600 text-xl"></i>
              </div>
              <span class="px-2 py-1 text-xs font-semibold rounded-full" 
                    [class]="getFatPercentage() > 100 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'">
                {{ getFatPercentage() }}%
              </span>
            </div>
            <div class="text-3xl font-bold text-red-600 mb-2">
              {{ dailyNutrition.totalFat.toFixed(1) }}g
            </div>
            <div class="text-sm text-gray-600 mb-3">Gorduras</div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-red-500 h-2 rounded-full transition-all duration-300" 
                   [style.width.%]="Math.min(getFatPercentage(), 100)"></div>
            </div>
            <div class="text-xs text-gray-500 mt-2">Meta: {{ dailyGoals.fat }}g</div>
          </div>
        </div>

        <!-- Meals Section -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div class="border-b border-gray-200">
            <nav class="flex space-x-8 px-6" aria-label="Tabs">
              <button
                *ngFor="let tab of tabs"
                [class]="activeTab === tab.value ? 
                  'border-green-500 text-green-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm' : 
                  'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'"
                (click)="activeTab = tab.value">
                <i [class]="tab.icon" class="mr-2"></i>
                {{ tab.label }}
              </button>
            </nav>
          </div>
          
          <div class="p-6">
            <app-meal-section 
              [entries]="getMealEntries(activeTab)"
              [mealType]="getMealType(activeTab)"
              (editEntry)="onEditEntry($event)"
              (deleteEntry)="onDeleteEntry($event)">
            </app-meal-section>
          </div>
        </div>

        <!-- Add Food Dialog -->
        <div *ngIf="showAddFoodDialog" 
             class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div class="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div class="sticky top-0 bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-t-2xl">
              <div class="flex justify-between items-center">
                <h2 class="text-2xl font-bold">Adicionar Alimento</h2>
                <button 
                  class="text-white hover:text-gray-200 text-2xl"
                  (click)="showAddFoodDialog = false">
                  <i class="pi pi-times"></i>
                </button>
              </div>
            </div>
            <div class="p-0">
              <app-add-food 
                (foodAdded)="onFoodAdded()"
                (cancel)="showAddFoodDialog = false">
              </app-add-food>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .tab-active {
      border-bottom: 2px solid #10b981;
      color: #10b981;
    }
    
    .tab-inactive {
      border-bottom: 2px solid transparent;
      color: #6b7280;
    }
    
    .tab-inactive:hover {
      color: #374151;
      border-bottom-color: #d1d5db;
    }
  `,
  ],
})
export class DashboardComponent implements OnInit {
  @Output() backToHome = new EventEmitter<void>()

  selectedDate: Date = new Date()
  selectedDateString = ""
  dailyNutrition!: DailyNutrition
  showAddFoodDialog = false
  activeTab = "breakfast"

  tabs = [
    { value: "breakfast", label: "🌅 Café da Manhã", icon: "pi pi-sun" },
    { value: "lunch", label: "☀️ Almoço", icon: "pi pi-clock" },
    { value: "dinner", label: "🌙 Jantar", icon: "pi pi-moon" },
    { value: "snack", label: "🍎 Lanches", icon: "pi pi-heart" },
  ]

  MealType = MealType
  Math = Math

  dailyGoals = {
    calories: 2000,
    protein: 150, // gramas
    carbs: 250, // gramas
    fat: 67, // gramas
  }

  constructor(private foodService: FoodService) {}

  ngOnInit() {
    this.updateDateString()
    this.loadDailyNutrition()
  }

  private updateDateString() {
    this.selectedDateString = this.selectedDate.toISOString().split("T")[0]
  }

  onDateChange() {
    this.selectedDate = new Date(this.selectedDateString)
    this.loadDailyNutrition()
  }

  private loadDailyNutrition() {
    this.dailyNutrition = this.foodService.getDailyNutrition(this.selectedDate)
  }

  getMealEntries(tabValue: string) {
    const mealType = this.getMealType(tabValue)
    return this.dailyNutrition.meals[mealType] || []
  }

  getMealType(tabValue: string): MealType {
    switch (tabValue) {
      case "breakfast":
        return MealType.BREAKFAST
      case "lunch":
        return MealType.LUNCH
      case "dinner":
        return MealType.DINNER
      case "snack":
        return MealType.SNACK
      default:
        return MealType.BREAKFAST
    }
  }

  onFoodAdded() {
    this.showAddFoodDialog = false
    this.loadDailyNutrition()
  }

  onEditEntry(entry: any) {
    // Implementation for editing entry
    console.log("Edit entry:", entry)
  }

  onDeleteEntry(entryId: string) {
    this.foodService.deleteFoodEntry(entryId)
    this.loadDailyNutrition()
  }

  goBack() {
    this.backToHome.emit()
  }

  getCaloriePercentage(): number {
    return Math.round((this.dailyNutrition.totalCalories / this.dailyGoals.calories) * 100)
  }

  getProteinPercentage(): number {
    return Math.round((this.dailyNutrition.totalProtein / this.dailyGoals.protein) * 100)
  }

  getCarbsPercentage(): number {
    return Math.round((this.dailyNutrition.totalCarbs / this.dailyGoals.carbs) * 100)
  }

  getFatPercentage(): number {
    return Math.round((this.dailyNutrition.totalFat / this.dailyGoals.fat) * 100)
  }
}
