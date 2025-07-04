export interface Food {
  id: string
  name: string
  brand?: string
  category: string
  nutritionPer100g: NutritionInfo
  servingSizes: ServingSize[]
  barcode?: string
}

export interface NutritionInfo {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  sugar: number
  sodium: number
}

export interface ServingSize {
  name: string
  grams: number
}

export interface FoodEntry {
  id: string
  foodId: string
  food: Food
  servingSize: number // gramas
  meal: MealType
  date: Date
  nutrition: NutritionInfo
}

export enum MealType {
  BREAKFAST = "breakfast",
  LUNCH = "lunch",
  DINNER = "dinner",
  SNACK = "snack",
}

export interface DailyNutrition {
  date: Date
  totalCalories: number
  totalProtein: number
  totalCarbs: number
  totalFat: number
  totalFiber: number
  totalSugar: number
  totalSodium: number
  meals: {
    [key in MealType]: FoodEntry[]
  }
}
