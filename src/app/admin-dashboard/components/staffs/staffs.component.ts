import { Component } from '@angular/core';
import { StaffService } from '../../../services/admin-dasboard/staff.service';
import { TaostrService } from '../../../services/common/taostr.service';
import { messages } from '../../../constant/admin-dashboard/staff.messages';

@Component({
  selector: 'app-staffs',
  templateUrl: './staffs.component.html',
  styleUrls: ['./staffs.component.scss'],
})
export class StaffsComponent {
  getAllStaffsFetched: any;

  constructor(
    private staffsService: StaffService,
    private taostrService: TaostrService
  ) {}

  ngOnInit() {
    this.getAllStaffs();
  }

  getAllStaffs() {
    this.staffsService.getAllStaffs('users/all-users').subscribe((response) => {
      if (response.status) {
        this.taostrService.showSuccess(
          messages.users.success.title,
          messages.users.success.message
        );
        this.getAllStaffsFetched = response.result;
      } else {
        this.taostrService.showSuccess(
          messages.users.error.title,
          messages.users.error.message
        );
      }
    });
  }
}
