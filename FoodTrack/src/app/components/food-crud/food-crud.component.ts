import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import type { Food, FoodCategory } from "../../models/food.model"
import { FoodService } from "../../services/food.service"

@Component({
  selector: "app-food-crud",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: "./food-crud.component.html",
  styleUrls: ["./food-crud.component.css"],
})
export class FoodCrudComponent implements OnInit {
  foods: Food[] = []
  food: Food = this.getEmptyFood()
  selectedFoods: Food[] = []

  foodDialog = false
  submitted = false

  categories: FoodCategory[] = [
    { label: "Pizza", value: "Pizza" },
    { label: "Hambúrguer", value: "Hambúrguer" },
    { label: "Salada", value: "Salada" },
    { label: "Sobremesa", value: "Sobremesa" },
    { label: "Bebida", value: "Bebida" },
    { label: "Prato Principal", value: "Prato Principal" },
  ]

  constructor(private foodService: FoodService) {}

  ngOnInit() {
    this.foodService.getFoods().subscribe((foods) => {
      this.foods = foods
    })
  }

  openNew() {
    this.food = this.getEmptyFood()
    this.submitted = false
    this.foodDialog = true
  }

  deleteSelectedFoods() {
    if (window.confirm("Tem certeza que deseja excluir os itens selecionados?")) {
      this.selectedFoods.forEach((food) => {
        if (food.id) {
          this.foodService.deleteFood(food.id)
        }
      })
      this.selectedFoods = []
      alert("Itens excluídos com sucesso")
    }
  }

  editFood(food: Food) {
    this.food = { ...food }
    this.foodDialog = true
  }

  deleteFood(food: Food) {
    if (window.confirm(`Tem certeza que deseja excluir ${food.name}?`)) {
      if (food.id) {
        this.foodService.deleteFood(food.id)
        alert("Item excluído com sucesso")
      }
    }
  }

  hideDialog() {
    this.foodDialog = false
    this.submitted = false
  }

  saveFood() {
    this.submitted = true

    if (this.food.name?.trim()) {
      if (this.food.id) {
        this.foodService.updateFood(this.food)
        alert("Item atualizado com sucesso")
      } else {
        this.foodService.addFood(this.food)
        alert("Item criado com sucesso")
      }

      this.foodDialog = false
      this.food = this.getEmptyFood()
    }
  }

  getAvailabilityText(isAvailable: boolean): string {
    return isAvailable ? "Disponível" : "Indisponível"
  }

  private getEmptyFood(): Food {
    return {
      name: "",
      category: "",
      price: 0,
      description: "",
      calories: 0,
      ingredients: [],
      isVegetarian: false,
      isAvailable: true,
      imageUrl: "",
    }
  }

  isAllSelected(): boolean {
    return this.foods.length > 0 && this.selectedFoods.length === this.foods.length;
  }

  toggleSelectAll(checked: boolean) {
    if (checked) {
      this.selectedFoods = [...this.foods];
    } else {
      this.selectedFoods = [];
    }
  }

  isSelected(food: Food): boolean {
    return this.selectedFoods.includes(food);
  }

  onSelectFood(food: Food, checked: boolean) {
    if (checked) {
      if (!this.selectedFoods.includes(food)) {
        this.selectedFoods = [...this.selectedFoods, food];
      }
    } else {
      this.selectedFoods = this.selectedFoods.filter(f => f !== food);
    }
  }
}
