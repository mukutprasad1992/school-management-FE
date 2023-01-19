import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { LandingComponent } from './landing/landing.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { NgChartsModule } from 'ng2-charts';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { ChartsComponent } from './common/charts/charts.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { StaffsComponent } from './components/staffs/staffs.component';
import { StudentsComponent } from './components/students/students.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { LeavesComponent } from './components/leaves/leaves.component';
import { ExamsComponent } from './components/exams/exams.component';
import { ClassesComponent } from './components/classes/classes.component';
import { ResetpasswordComponent } from '../auth/resetpassword/resetpassword.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    StaffsComponent,
    StudentsComponent,
    AttendanceComponent,
    LeavesComponent,
    ExamsComponent,
    ClassesComponent,
    ResetpasswordComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    AdminDashboardRoutingModule,
    NgChartsModule,
    CarouselModule,
  ],
})
export class AdminDashboardModule {}
