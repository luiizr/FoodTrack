import { Routes } from '@angular/router';

// Templates
import { DashboardTest } from './Templates/Dashboard-Test/dashboardTest';
import { LandingPage } from './Templates/Landing-page/landing-page';

// Auth Components
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';

// Dashboard Component
import { DashboardComponent } from './components/dashboard/dashboard.component';

// Guards
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LandingPage },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'crud-teste', component: DashboardTest, canActivate: [authGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
];