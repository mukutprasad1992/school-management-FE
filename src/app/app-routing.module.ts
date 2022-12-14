import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { DashboardRoutingModule } from "./dashboard/dashboard-routing.module"

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule)
  },
  {
    path: 'landing',
    loadChildren: () => import('./landing/landing-routing.module').then(m => m.LandingRoutingModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard-routing.module').then(m => m.DashboardRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AuthRoutingModule, DashboardRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
