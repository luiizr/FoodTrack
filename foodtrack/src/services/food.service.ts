import { Injectable } from "@angular/core"
import { BehaviorSubject, type Observable, of } from "rxjs"
import { type Food, type FoodEntry, type DailyNutrition, MealType, type NutritionInfo } from "../models/food.model"

@Injectable({
  providedIn: "root",
})
export class FoodService {
  private foodsSubject = new BehaviorSubject<Food[]>([])
  private entriesSubject = new BehaviorSubject<FoodEntry[]>([])

  foods$ = this.foodsSubject.asObservable()
  entries$ = this.entriesSubject.asObservable()

  constructor() {
    this.initializeBrazilianFoods()
    this.loadEntries()
  }

  private initializeBrazilianFoods() {
    const brazilianFoods: Food[] = [
      {
        id: "1",
        name: "Arroz Branco Cozido",
        category: "Cereais",
        nutritionPer100g: {
          calories: 128,
          protein: 2.7,
          carbs: 28.2,
          fat: 0.3,
          fiber: 1.4,
          sugar: 0.1,
          sodium: 1,
        },
        servingSizes: [
          { name: "1 colher de sopa", grams: 25 },
          { name: "1 xícara", grams: 158 },
          { name: "1 prato raso", grams: 100 },
        ],
      },
      {
        id: "2",
        name: "Feijão Preto Cozido",
        category: "Leguminosas",
        nutritionPer100g: {
          calories: 77,
          protein: 4.5,
          carbs: 14.0,
          fat: 0.5,
          fiber: 8.4,
          sugar: 0.3,
          sodium: 2,
        },
        servingSizes: [
          { name: "1 concha", grams: 86 },
          { name: "1 xícara", grams: 172 },
        ],
      },
      {
        id: "3",
        name: "Peito de Frango Grelhado",
        category: "Carnes",
        nutritionPer100g: {
          calories: 165,
          protein: 31.0,
          carbs: 0,
          fat: 3.6,
          fiber: 0,
          sugar: 0,
          sodium: 74,
        },
        servingSizes: [
          { name: "1 filé pequeno", grams: 100 },
          { name: "1 filé médio", grams: 150 },
          { name: "1 filé grande", grams: 200 },
        ],
      },
      {
        id: "4",
        name: "Banana Nanica",
        category: "Frutas",
        nutritionPer100g: {
          calories: 89,
          protein: 1.1,
          carbs: 22.8,
          fat: 0.3,
          fiber: 2.6,
          sugar: 12.2,
          sodium: 1,
        },
        servingSizes: [
          { name: "1 banana pequena", grams: 81 },
          { name: "1 banana média", grams: 118 },
        ],
      },
      {
        id: "5",
        name: "Ovo de Galinha Cozido",
        category: "Ovos",
        nutritionPer100g: {
          calories: 155,
          protein: 13.0,
          carbs: 1.1,
          fat: 10.6,
          fiber: 0,
          sugar: 1.1,
          sodium: 124,
        },
        servingSizes: [
          { name: "1 ovo grande", grams: 50 },
          { name: "1 ovo médio", grams: 44 },
        ],
      },
      {
        id: "6",
        name: "Salmão Grelhado",
        category: "Peixes",
        nutritionPer100g: {
          calories: 208,
          protein: 25.4,
          carbs: 0,
          fat: 12.4,
          fiber: 0,
          sugar: 0,
          sodium: 59,
        },
        servingSizes: [
          { name: "1 filé pequeno", grams: 120 },
          { name: "1 filé médio", grams: 150 },
        ],
      },
    ]

    this.foodsSubject.next(brazilianFoods)
  }

  private loadEntries() {
    const savedEntries = localStorage.getItem("foodEntries")
    if (savedEntries) {
      try {
        const entries = JSON.parse(savedEntries).map((entry: any) => ({
          ...entry,
          date: new Date(entry.date),
        }))
        this.entriesSubject.next(entries)
      } catch (error) {
        console.error("Error loading entries:", error)
        this.entriesSubject.next([])
      }
    }
  }

  private saveEntries(entries: FoodEntry[]) {
    try {
      localStorage.setItem("foodEntries", JSON.stringify(entries))
    } catch (error) {
      console.error("Error saving entries:", error)
    }
  }

  searchFoods(query: string): Observable<Food[]> {
    const foods = this.foodsSubject.value
    const filtered = foods.filter(
      (food) =>
        food.name.toLowerCase().includes(query.toLowerCase()) ||
        food.category.toLowerCase().includes(query.toLowerCase()),
    )
    return of(filtered)
  }

  getAllFoods(): Observable<Food[]> {
    return this.foods$
  }

  addFoodEntry(foodId: string, servingGrams: number, meal: MealType, date: Date = new Date()): void {
    const food = this.foodsSubject.value.find((f) => f.id === foodId)
    if (!food) {
      console.error("Food not found:", foodId)
      return
    }

    const nutrition = this.calculateNutrition(food.nutritionPer100g, servingGrams)

    const entry: FoodEntry = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      foodId,
      food,
      servingSize: servingGrams,
      meal,
      date,
      nutrition,
    }

    const currentEntries = this.entriesSubject.value
    const updatedEntries = [...currentEntries, entry]
    this.entriesSubject.next(updatedEntries)
    this.saveEntries(updatedEntries)

    console.log("Food entry added:", entry)
  }

  updateFoodEntry(entryId: string, servingGrams: number): void {
    const currentEntries = this.entriesSubject.value
    const entryIndex = currentEntries.findIndex((e) => e.id === entryId)

    if (entryIndex !== -1) {
      const entry = currentEntries[entryIndex]
      const nutrition = this.calculateNutrition(entry.food.nutritionPer100g, servingGrams)

      const updatedEntry = {
        ...entry,
        servingSize: servingGrams,
        nutrition,
      }

      const updatedEntries = [...currentEntries]
      updatedEntries[entryIndex] = updatedEntry

      this.entriesSubject.next(updatedEntries)
      this.saveEntries(updatedEntries)
    }
  }

  deleteFoodEntry(entryId: string): void {
    const currentEntries = this.entriesSubject.value
    const updatedEntries = currentEntries.filter((e) => e.id !== entryId)
    this.entriesSubject.next(updatedEntries)
    this.saveEntries(updatedEntries)
  }

  getDailyNutrition(date: Date): DailyNutrition {
    const entries = this.entriesSubject.value.filter((entry) => this.isSameDay(entry.date, date))

    const meals = {
      [MealType.BREAKFAST]: entries.filter((e) => e.meal === MealType.BREAKFAST),
      [MealType.LUNCH]: entries.filter((e) => e.meal === MealType.LUNCH),
      [MealType.DINNER]: entries.filter((e) => e.meal === MealType.DINNER),
      [MealType.SNACK]: entries.filter((e) => e.meal === MealType.SNACK),
    }

    const totals = entries.reduce(
      (acc, entry) => ({
        totalCalories: acc.totalCalories + entry.nutrition.calories,
        totalProtein: acc.totalProtein + entry.nutrition.protein,
        totalCarbs: acc.totalCarbs + entry.nutrition.carbs,
        totalFat: acc.totalFat + entry.nutrition.fat,
        totalFiber: acc.totalFiber + entry.nutrition.fiber,
        totalSugar: acc.totalSugar + entry.nutrition.sugar,
        totalSodium: acc.totalSodium + entry.nutrition.sodium,
      }),
      {
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFat: 0,
        totalFiber: 0,
        totalSugar: 0,
        totalSodium: 0,
      },
    )

    return {
      date,
      ...totals,
      meals,
    }
  }

  private calculateNutrition(nutritionPer100g: NutritionInfo, grams: number): NutritionInfo {
    const factor = grams / 100
    return {
      calories: Math.round(nutritionPer100g.calories * factor),
      protein: Math.round(nutritionPer100g.protein * factor * 10) / 10,
      carbs: Math.round(nutritionPer100g.carbs * factor * 10) / 10,
      fat: Math.round(nutritionPer100g.fat * factor * 10) / 10,
      fiber: Math.round(nutritionPer100g.fiber * factor * 10) / 10,
      sugar: Math.round(nutritionPer100g.sugar * factor * 10) / 10,
      sodium: Math.round(nutritionPer100g.sodium * factor),
    }
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    )
  }
}
