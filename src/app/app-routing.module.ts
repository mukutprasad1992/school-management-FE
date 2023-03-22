import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { AdminDashboardRoutingModule } from './admin-dashboard/admin-dashboard-routing.module';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth-routing.module').then((m) => m.AuthRoutingModule),
  },
  {
    path: 'landing',
    loadChildren: () =>
      import('./landing/landing-routing.module').then(
        (m) => m.LandingRoutingModule
      ),
  },
  {
    path: 'admin/dashboard',
    loadChildren: () =>
      import('./admin-dashboard/admin-dashboard-routing.module').then(
        (m) => m.AdminDashboardRoutingModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule,
    AdminDashboardRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
