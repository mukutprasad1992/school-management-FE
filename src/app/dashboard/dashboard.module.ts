import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LandingComponent } from './landing/landing.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { NgChartsModule } from 'ng2-charts';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [LandingComponent, AccountSettingsComponent, CalendarComponent],
  imports: [
    CommonModule,
    FullCalendarModule,
    DashboardRoutingModule,
    NgChartsModule,
  ],
})
export class DashboardModule {}
