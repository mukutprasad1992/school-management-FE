import { Component } from '@angular/core';
import { StudentService } from '../../../services/admin-dasboard/students.service';
import { TaostrService } from '../../../services/common/taostr.service';
import { messages } from '../../../constant/admin-dashboard/student.messages';
import { defaultPagination } from '../../../constant/admin-dashboard/pagination.constant';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent {
  getAllStudntsFetched: any;
  public getUser: any;

  page: number = defaultPagination.defaultPage;
  totalCount: number = defaultPagination.defaultTotalCount;
  tableSize: number = defaultPagination.defaultTableSize;

  constructor(
    private stuentsService: StudentService,
    private taostrService: TaostrService
  ) {}

  ngOnInit() {
    this.getAllStudents();
    this.getUserByLocalStorage();
  }

  getAllStudents() {
    this.stuentsService
      .getAllStudents('users/all-users/6332d11f0c5e58b0b0e3c17a')
      .subscribe((response) => {
        if (response.status) {
          this.taostrService.showSuccess(
            messages.users.success.title,
            messages.users.success.message
          );
          this.getAllStudntsFetched = response.result;
        } else {
          this.taostrService.showSuccess(
            messages.users.error.title,
            messages.users.error.message
          );
        }
      });
  }

  getAllStatusUpdate(userId: string, status: string) {
    this.stuentsService
      .getAllStatusUpdate(`users/user-activation/${userId}`, {
        status,
      })
      .subscribe((response) => {
        if (response.status) {
          this.taostrService.showSuccess(
            messages.updateStatus.success.title,
            messages.updateStatus.success.message
          );
          this.getAllStudents();
        } else {
          this.taostrService.showSuccess(
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
    this.getAllStudents();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllStudents();
  }
}
