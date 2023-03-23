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

  public getUser: any;
  getTeacherUpdate: any;

  constructor(
    private teacherService: TeacherService,
    private taostrService: TaostrService
  ) {}

  ngOnInit() {
    this.getAllTeachers();
    this.getUserByLocalStorage();
  }

  getAllTeachers() {
    this.teacherService
      .getAllTeachers('users/all-users/641c4d6411e9ec35f85831ae')
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

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllTeachers();
  }

  onTeacherSelect(getTeacher: any) {
    // console.log(getTeacher);
    this.getTeacherUpdate = getTeacher;
    console.log(this.getTeacherUpdate);
  }

  // deleteTeacher(user_id: string) {
  //   this.teacherService
  //     .deleteTeacher(`roles/6332d0c50c5e58b0b0e3c16e`)
  //     .subscribe((response) => {
  //       console.log('Teacher is deleted', user_id);
  //       if (response.status) {
  //         this.taostrService.showSuccess(
  //           messages.deleteTeacher.success.title,
  //           messages.deleteTeacher.success.message
  //         );
  //       } else {
  //         this.taostrService.showError(
  //           messages.deleteTeacher.error.title,
  //           messages.deleteTeacher.error.message
  //         );
  //       }
  //       this.getAllTeachers();
  //     });
  // }  this API  will delete roles so this have to change by backend.
}
