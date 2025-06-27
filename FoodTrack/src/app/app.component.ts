import { Component } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import { FoodCrudComponent } from "./components/food-crud/food-crud.component"

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, FoodCrudComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <app-food-crud></app-food-crud>
    </div>
    <router-outlet />
  `,
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "FoodTrack"
}
