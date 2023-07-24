import { Component } from '@angular/core';
import { StaffService } from '../../../services/admin-dasboard/staff.service';
import { TaostrService } from '../../../services/common/taostr.service';
import { messages } from '../../../constant/admin-dashboard/staff.messages';
import { defaultPagination } from '../../../constant/admin-dashboard/pagination.constant';

@Component({
  selector: 'app-staffs',
  templateUrl: './staffs.component.html',
  styleUrls: ['./staffs.component.scss'],
})
export class StaffsComponent {
  getAllStaffsFetched: any;
  getStaffUpdate: any;

  page: number = defaultPagination.defaultPage;
  totalCount: number = defaultPagination.defaultTotalCount;
  tableSize: number = defaultPagination.defaultTableSize;

  public getUser: any;

  constructor(
    private staffsService: StaffService,
    private taostrService: TaostrService
  ) { }

  ngOnInit() {
    this.getAllStaffs();
    this.getUserByLocalStorage();
  }

  getAllStaffs() {
    this.staffsService
      .getAllStaffs('users/all-users/6332d1120c5e58b0b0e3c178')
      .subscribe((response) => {
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

  getAllStatusUpdate(userId: string, status: string) {
    this.staffsService
      .getAllStatusUpdate(`users/user-activation/${userId}`, {
        status,
      })
      .subscribe((response) => {
        if (response.status) {
          this.taostrService.showSuccess(
            messages.updateStatus.success.title,
            messages.updateStatus.success.message
          );
          this.getAllStaffs();
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
    this.getAllStaffs();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllStaffs();
  }

  onStaffSelect(getstaff: any) {
    this.getStaffUpdate = getstaff;
  }
}
