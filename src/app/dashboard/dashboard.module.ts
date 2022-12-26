import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LandingComponent } from './landing/landing.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { NgChartsModule } from 'ng2-charts';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { ChartsComponent } from './common/charts/charts.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    LandingComponent,
    AccountSettingsComponent,
    CalendarComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ChartsComponent,
    TeachersComponent,
  ],
  imports: [
    CommonModule,
    FullCalendarModule,
    DashboardRoutingModule,
    NgChartsModule,
    CarouselModule,
  ],
})
export class DashboardModule { }
