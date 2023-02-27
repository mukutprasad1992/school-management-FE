import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { StaffsComponent } from './components/staffs/staffs.component';
import { StudentsComponent } from './components/students/students.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { LeavesComponent } from './components/leaves/leaves.component';
import { ExamsComponent } from './components/exams/exams.component';
import { ClassesComponent } from './components/classes/classes.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { MySchoolComponent } from './components/my-school/my-school.component';
import { CSAssociationComponent } from './components/csassociation/csassociation.component';
import { CTAssociationComponent } from './components/ctassociation/ctassociation.component';
import { AttendanceSheetComponent } from './components/attendance-sheet/attendance-sheet.component';
import { AttendanceSubmitComponent } from './components/attendance-submit/attendance-submit.component';

const routes: Routes = [
  {
    path: 'landing',
    component: LandingComponent,
  },
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
  },
  {
    path: 'calendar',
    component: CalendarComponent,
  },
  {
    path: 'teachers',
    component: TeachersComponent,
  },
  {
    path: 'staffs',
    component: StaffsComponent,
  },
  {
    path: 'students',
    component: StudentsComponent,
  },
  {
    path: 'attendance-submit',
    component: AttendanceSubmitComponent,
  },
  {
    path: 'attendance-sheet',
    component: AttendanceSheetComponent,
  },
  {
    path: 'leaves',
    component: LeavesComponent,
  },
  {
    path: 'exams',
    component: ExamsComponent,
  },
  {
    path: 'classes',
    component: ClassesComponent,
  },
  {
    path: 'my-school',
    component: MySchoolComponent,
  },
  {
    path: 'cs-association',
    component: CSAssociationComponent,
  },
  {
    path: 'ct-association',
    component: CTAssociationComponent,
  },
  {
    path: 'attendance-sheet',
    component: AttendanceSheetComponent,
  },
  {
    path: 'attendance-submit',
    component: AttendanceSubmitComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDashboardRoutingModule { }
