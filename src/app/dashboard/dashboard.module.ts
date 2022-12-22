import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LandingComponent } from './landing/landing.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [LandingComponent, AccountSettingsComponent],
  imports: [CommonModule, DashboardRoutingModule, NgChartsModule],
})
export class DashboardModule {}
