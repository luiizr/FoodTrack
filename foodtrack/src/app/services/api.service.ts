import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Food {
  id: number;
  name: string;
  brand: string;
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  serving_size: string;
}

export interface DailyFoodLog {
  id: number;
  food: Food;
  quantity: number;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  date: string;
  total_calories: number;
  total_protein: number;
  total_carbohydrates: number;
  total_fat: number;
}

export interface DailySummary {
  date: string;
  summary: {
    total_calories: number;
    total_protein: number;
    total_carbohydrates: number;
    total_fat: number;
  };
  meals: {
    breakfast: DailyFoodLog[];
    lunch: DailyFoodLog[];
    dinner: DailyFoodLog[];
    snack: DailyFoodLog[];
  };
}

export interface CreateFoodLogData {
  food_id: number;
  quantity: number;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  date?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Alimentos
  getFoods(search?: string): Observable<Food[]> {
    let url = `${this.API_URL}/foods/`;
    if (search) {
      url += `?name=${encodeURIComponent(search)}`;
    }
    return this.http.get<Food[]>(url, { headers: this.getHeaders() });
  }

  getFood(id: number): Observable<Food> {
    return this.http.get<Food>(`${this.API_URL}/foods/${id}/`, { headers: this.getHeaders() });
  }

  searchFoodApi(query: string): Observable<{ foods: Food[] }> {
    return this.http.post<{ foods: Food[] }>(`${this.API_URL}/foods/search/`, 
      { query }, { headers: this.getHeaders() });
  }

  // Logs de alimentos
  getDailyFoodLogs(date?: string): Observable<DailyFoodLog[]> {
    let url = `${this.API_URL}/food-logs/`;
    if (date) {
      url += `?date=${date}`;
    }
    return this.http.get<DailyFoodLog[]>(url, { headers: this.getHeaders() });
  }

  createFoodLog(data: CreateFoodLogData): Observable<DailyFoodLog> {
    return this.http.post<DailyFoodLog>(`${this.API_URL}/food-logs/`, data, { headers: this.getHeaders() });
  }

  updateFoodLog(id: number, data: Partial<CreateFoodLogData>): Observable<DailyFoodLog> {
    return this.http.put<DailyFoodLog>(`${this.API_URL}/food-logs/${id}/`, data, { headers: this.getHeaders() });
  }

  deleteFoodLog(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/food-logs/${id}/`, { headers: this.getHeaders() });
  }

  getDailySummary(date?: string): Observable<DailySummary> {
    let url = `${this.API_URL}/food-logs/summary/`;
    if (date) {
      url += `?date=${date}`;
    }
    return this.http.get<DailySummary>(url, { headers: this.getHeaders() });
  }
} 