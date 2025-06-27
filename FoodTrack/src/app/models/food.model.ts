export interface Food {
  id?: number
  name: string
  category: string
  price: number
  description: string
  calories: number
  ingredients: string[]
  isVegetarian: boolean
  isAvailable: boolean
  imageUrl?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface FoodCategory {
  label: string
  value: string
}
