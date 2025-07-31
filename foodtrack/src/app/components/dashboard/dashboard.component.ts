import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, User } from '../../services/auth.service';
import { ApiService, Food, DailyFoodLog, DailySummary, CreateFoodLogData } from '../../services/api.service';
import { Router } from '@angular/router';

type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  foods: Food[] = [];
  dailyLogs: DailyFoodLog[] = [];
  dailySummary: DailySummary | null = null;
  searchQuery = '';
  loading = false;
  selectedDate = new Date().toISOString().split('T')[0];
  
  addFoodForm: FormGroup;
  showAddFoodModal = false;
  mealTypes: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.addFoodForm = this.fb.group({
      food_id: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      meal_type: ['breakfast', Validators.required]
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadDailyData();
    this.loadFoods();
  }

  loadDailyData(): void {
    this.loading = true;
    this.apiService.getDailySummary(this.selectedDate).subscribe({
      next: (summary) => {
        this.dailySummary = summary;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar dados diários:', error);
        this.loading = false;
        // Criar um resumo vazio se não houver dados
        this.dailySummary = {
          date: this.selectedDate,
          summary: {
            total_calories: 0,
            total_protein: 0,
            total_carbohydrates: 0,
            total_fat: 0
          },
          meals: {
            breakfast: [],
            lunch: [],
            dinner: [],
            snack: []
          }
        };
      }
    });
  }

  loadFoods(): void {
    this.apiService.getFoods().subscribe({
      next: (foods) => {
        this.foods = foods;
      },
      error: (error) => {
        console.error('Erro ao carregar alimentos:', error);
        this.foods = [];
      }
    });
  }

  searchFoods(): void {
    if (this.searchQuery.trim()) {
      this.loading = true;
      this.apiService.searchFoodApi(this.searchQuery).subscribe({
        next: (response) => {
          this.foods = response.foods;
          this.loading = false;
        },
        error: (error) => {
          console.error('Erro ao buscar alimentos:', error);
          this.loading = false;
          // Em caso de erro, tentar buscar localmente
          this.apiService.getFoods(this.searchQuery).subscribe({
            next: (foods) => {
              this.foods = foods;
            },
            error: () => {
              this.foods = [];
            }
          });
        }
      });
    } else {
      this.loadFoods();
    }
  }

  addFoodToLog(): void {
    if (this.addFoodForm.valid) {
      const formData: CreateFoodLogData = {
        ...this.addFoodForm.value,
        date: this.selectedDate
      };

      this.apiService.createFoodLog(formData).subscribe({
        next: () => {
          this.loadDailyData();
          this.addFoodForm.reset({ meal_type: 'breakfast' });
          this.showAddFoodModal = false;
        },
        error: (error) => {
          console.error('Erro ao adicionar alimento:', error);
          alert('Erro ao adicionar alimento. Verifique se o backend está rodando.');
        }
      });
    }
  }

  deleteFoodLog(id: number): void {
    if (confirm('Tem certeza que deseja remover este alimento?')) {
      this.apiService.deleteFoodLog(id).subscribe({
        next: () => {
          this.loadDailyData();
        },
        error: (error) => {
          console.error('Erro ao remover alimento:', error);
          alert('Erro ao remover alimento.');
        }
      });
    }
  }

  onDateChange(): void {
    this.loadDailyData();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getMealTypeLabel(type: string): string {
    const labels = {
      breakfast: 'Café da Manhã',
      lunch: 'Almoço',
      dinner: 'Jantar',
      snack: 'Lanche'
    };
    return labels[type as keyof typeof labels] || type;
  }

  getMealsByType(mealType: string): any[] {
    if (!this.dailySummary) return [];
    return this.dailySummary.meals[mealType as keyof typeof this.dailySummary.meals] || [];
  }

  selectFoodAndOpenModal(food: any): void {
    this.addFoodForm.patchValue({
      food_id: food.id,
      quantity: 100,
      meal_type: 'breakfast'
    });
    this.showAddFoodModal = true;
  }
} 