import { Component } from '@angular/core';
import { TeacherService } from '../../../services/admin-dasboard/teacher.service';
import { TaostrService } from '../../../services/common/taostr.service';
import { messages } from '../../../constant/admin-dashboard/teacher.messages';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
})
export class TeachersComponent {
  getAllTeachersFetched: any;

  constructor(
    private teacherService: TeacherService,
    private taostrService: TaostrService
  ) {}

  ngOnInit() {
    this.getAllTeachers();
  }

  getAllTeachers() {
    this.teacherService
      .getAllTeachers('users/all-users')
      .subscribe((response) => {
        if (response.status) {
          this.taostrService.showSuccess(
            messages.users.success.title,
            messages.users.success.message
          );
          this.getAllTeachersFetched = response.result;
        } else {
          this.taostrService.showSuccess(
            messages.users.error.title,
            messages.users.error.message
          );
        }
      });
  }
}
