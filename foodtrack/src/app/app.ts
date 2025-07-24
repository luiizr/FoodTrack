import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingPage } from './Templates/Landing-page/landing-page';
import { DashboardTest } from './Templates/Dashboard-Test/dashboardTest';

@Component({
  selector: 'app-root',
  imports: [RouterModule, LandingPage, DashboardTest],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
