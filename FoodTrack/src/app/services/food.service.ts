import { Injectable } from "@angular/core"
import { BehaviorSubject, type Observable } from "rxjs"
import type { Food } from "../models/food.model"

@Injectable({
  providedIn: "root",
})
export class FoodService {
  private foodsSubject = new BehaviorSubject<Food[]>([
    {
      id: 1,
      name: "Pizza Margherita",
      category: "Pizza",
      price: 25.9,
      description: "Pizza clássica com molho de tomate, mussarela e manjericão",
      calories: 280,
      ingredients: ["Massa", "Molho de tomate", "Mussarela", "Manjericão"],
      isVegetarian: true,
      isAvailable: true,
      imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: "Hambúrguer Artesanal",
      category: "Hambúrguer",
      price: 32.5,
      description: "Hambúrguer com carne artesanal, queijo cheddar e bacon",
      calories: 450,
      ingredients: ["Pão brioche", "Carne 180g", "Queijo cheddar", "Bacon", "Alface"],
      isVegetarian: false,
      isAvailable: true,
      imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      name: "Salada Caesar",
      category: "Salada",
      price: 18.9,
      description: "Salada fresca com alface romana, croutons e molho caesar",
      calories: 180,
      ingredients: ["Alface romana", "Croutons", "Parmesão", "Molho caesar"],
      isVegetarian: true,
      isAvailable: false,
      imageUrl: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ])

  foods$ = this.foodsSubject.asObservable()

  getFoods(): Observable<Food[]> {
    return this.foods$
  }

  addFood(food: Food): void {
    const currentFoods = this.foodsSubject.value
    const newFood = {
      ...food,
      id: Math.max(...currentFoods.map((f) => f.id || 0)) + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.foodsSubject.next([...currentFoods, newFood])
  }

  updateFood(food: Food): void {
    const currentFoods = this.foodsSubject.value
    const index = currentFoods.findIndex((f) => f.id === food.id)
    if (index !== -1) {
      currentFoods[index] = { ...food, updatedAt: new Date() }
      this.foodsSubject.next([...currentFoods])
    }
  }

  deleteFood(id: number): void {
    const currentFoods = this.foodsSubject.value
    this.foodsSubject.next(currentFoods.filter((f) => f.id !== id))
  }
}
