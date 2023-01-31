import { Component } from '@angular/core';
import { StudentService } from '../../../services/admin-dasboard/students.service';
import { TaostrService } from '../../../services/common/taostr.service';
import { messages } from '../../../constant/admin-dashboard/student.messages';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent {
  getAllStudntsFetched: any;

  constructor(
    private stuentsService: StudentService,
    private taostrService: TaostrService
  ) {}

  ngOnInit() {
    this.getAllStudents();
  }

  getAllStudents() {
    this.stuentsService
      .getAllStudents('users/all-users')
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
}
