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
  getStudentUpdate: any;
  deleteCurrentStudentRow: any;

  page: number = defaultPagination.defaultPage;
  totalCount: number = defaultPagination.defaultTotalCount;
  tableSize: number = defaultPagination.defaultTableSize;

  constructor(
    private stuentsService: StudentService,
    private taostrService: TaostrService
  ) { }

  ngOnInit() {
    this.getAllStudents();
    this.getUserByLocalStorage();
  }

  getAllStudents() {
    this.stuentsService
      .getAllStudents('users/all-users/64b7941f72205cd723117d4e')
      .subscribe((response) => {
        if (response.status) {
          this.taostrService.showSuccess(
            messages.users.success.title,
            messages.users.success.message
          );
          this.getAllStudntsFetched = response.result;
        } else {
          this.taostrService.showError(
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
    this.getAllStudents();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllStudents();
  }

  onStudentSelect(getStudent: any) {
    // console.log(getTeacher);
    this.getStudentUpdate = getStudent;
  }

  onClick(studentRow: any) {
    console.info("getStudent : ", studentRow)
    this.deleteCurrentStudentRow = studentRow;
  }

  deleteStudentRow(studentId: any, deleteCurrentStudentRow: any) {
    console.info("deleteCurrentStudentRow", deleteCurrentStudentRow._id)
    this.stuentsService
      .deleteStudent(`users/${deleteCurrentStudentRow._id}`)
      .subscribe((response) => {
        console.info("deleteCurrentStaffRow._id", deleteCurrentStudentRow._id)
        if (response.status) {
          this.taostrService.showSuccess(
            messages.deleteStudent.success.title,
            messages.deleteStudent.success.message
          );
          this.getAllStudents();
        } else {
          this.taostrService.showError(
            messages.deleteStudent.error.title,
            messages.deleteStudent.error.message
          );
        }
      });
  }


}
