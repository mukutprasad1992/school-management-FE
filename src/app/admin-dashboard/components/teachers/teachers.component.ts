import { Component } from '@angular/core';
import { TeacherService } from '../../../services/admin-dasboard/teacher.service';
import { TaostrService } from '../../../services/common/taostr.service';
import { messages } from '../../../constant/admin-dashboard/teacher.messages';
import { defaultPagination } from '../../../constant/admin-dashboard/pagination.constant';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
})
export class TeachersComponent {
  page: number = defaultPagination.defaultPage;
  totalCount: number = defaultPagination.defaultTotalCount;
  tableSize: number = defaultPagination.defaultTableSize;

  getAllTeachersFetched: any;
  deleteCurrentTeacherRow: any;

  public getUser: any;
  getTeacherOnSelect: any;

  constructor(
    private teacherService: TeacherService,
    private taostrService: TaostrService
  ) { }

  ngOnInit() {
    this.getAllTeachers();
    this.getUserByLocalStorage();
  }

  getAllTeachers() {
    this.teacherService
      .getAllTeachers('users/all-users/64b7941272205cd723117d4c')
      .subscribe((response) => {
        if (response.status) {
          this.taostrService.showSuccess(
            messages.users.success.title,
            messages.users.success.message
          );
          this.getAllTeachersFetched = response.result;
          this.totalCount = response.result.length;
        } else {
          this.taostrService.showError(
            messages.users.error.title,
            messages.users.error.message
          );
        }
      });
  }

  getAllStatusUpdate(userId: string, status: string) {
    this.teacherService
      .getAllStatusUpdate(`users/user-activation/${userId}`, {
        status,
      })
      .subscribe((response) => {
        if (response.status) {
          this.taostrService.showSuccess(
            messages.updateStatus.success.title,
            messages.updateStatus.success.message
          );
          this.getAllTeachers();
        } else {
          this.taostrService.showError(
            messages.updateStatus.error.title,
            messages.updateStatus.error.message
          );
        }
      });
  }

  getUserByLocalStorage() {
    const getStringifyUser: any = localStorage.getItem('user');
    this.getUser = JSON.parse(getStringifyUser);
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getAllTeachers();
  }

  onTeacherSelect(getTeacher: any) {
    console.log(getTeacher);
    this.getTeacherOnSelect = getTeacher;
    console.info("getTeacherOnSelect", this.getTeacherOnSelect)
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllTeachers();
  }

  onClick(teacherRow: any) {
    console.info("getTeacher : ", teacherRow)
    this.deleteCurrentTeacherRow = teacherRow;
  }

  deleteTeacherRow(action: any, deleteCurrentTeacherRow: any) {
    console.info("deleteCurrentTeacherRow", deleteCurrentTeacherRow)
    this.teacherService
      .deleteTeacher(`users/${deleteCurrentTeacherRow._id}`)
      .subscribe((response) => {
        if (response.status) {
          this.taostrService.showSuccess(
            messages.deleteTeacher.success.title,
            messages.deleteTeacher.success.message
          );
          this.getAllTeachers();
        } else {
          this.taostrService.showError(
            messages.deleteTeacher.error.title,
            messages.deleteTeacher.error.message
          );
        }
      });
  }
}


