import { Routes } from '@angular/router';

// Templates
import { DashboardTest } from './Templates/Dashboard-Test/dashboardTest';
import { LandingPage } from './Templates/Landing-page/landing-page';

export const routes: Routes = [
  { path: '', component: LandingPage },
  { path: 'crud-teste', component: DashboardTest },
];