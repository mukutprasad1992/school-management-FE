import { Component } from '@angular/core';
import { LeaveServices } from '../../../services/admin-dasboard/leave.service';
import { TaostrService } from '../../../services/common/taostr.service';
import { messages } from '../../../constant/admin-dashboard/leave.messages';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { defaultPagination } from '../../../constant/admin-dashboard/pagination.constant';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.scss'],
})
export class LeavesComponent {
  leaveForm!: FormGroup;
  public getUser: any;

  page: number = defaultPagination.defaultPage;
  totalCount: number = defaultPagination.defaultTotalCount;
  tableSize: number = defaultPagination.defaultTableSize;

  constructor(
    private leaveService: LeaveServices,
    private taostrService: TaostrService
  ) {}

  allTeachers: any = [];
  getLeaveData: any = [];
  selectedOptionleaveType: any;
  selectedOptiontag: any;
  getLeaveUpdate: any;

  ngOnInit() {
    this.getUserByLocalStorage();
    this.getAllTeachers();
    this.createFormBuilder();
    this.getLeave();
  }

  createFormBuilder() {
    this.leaveForm = new FormGroup({
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      reason: new FormControl('', [Validators.required]),
      leaveType: new FormControl('', [Validators.required]),
      tag: new FormControl('', [Validators.required]),
    });
  }

  get startDate() {
    return this.leaveForm.get('startDate')!;
  }
  get endDate() {
    return this.leaveForm.get('endDate')!;
  }
  get reason() {
    return this.leaveForm.get('reason')!;
  }
  get leaveType() {
    return this.leaveForm.get('leaveType')!;
  }
  get tag() {
    return this.leaveForm.get('tag')!;
  }

  getUserByLocalStorage() {
    const getStringifyUser: any = localStorage.getItem('user');
    this.getUser = JSON.parse(getStringifyUser);
  }

  getAllTeachers() {
    this.leaveService
      .getAllTeachers('users/all-users/641c4d6411e9ec35f85831ae')
      .subscribe((response) => {
        if (response.status) {
          this.taostrService.showSuccess;
          messages.Teachers.success.title, messages.Teachers.success.message;
          this.allTeachers = response.result;
        } else {
          this.taostrService.showSuccess;
          messages.Teachers.error.title, messages.Teachers.error.message;
        }
      });
  }

  getLeave() {
    this.leaveService.getLeave('leaves').subscribe((response) => {
      if (response.status) {
        this.taostrService.showSuccess(
          messages.GetLeave.success.title,
          messages.GetLeave.success.message
        );
        this.getLeaveData = response.result;
        this.totalCount = response.result.length;
      } else {
        this.taostrService.showSuccess(
          messages.GetLeave.error.title,
          messages.GetLeave.error.message
        );
      }
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getLeave();
  }

  onSubmit() {
    if (this.leaveForm.valid) {
      this.leaveService
        .CreateLeaves('leaves', this.leaveForm.value)
        .subscribe((response) => {
          if (response.status) {
            this.getLeave();
            this.taostrService.showSuccess(
              messages.SubmitMsg.success.title,
              messages.SubmitMsg.success.message
            );
          } else {
            this.taostrService.showError(
              messages.SubmitMsg.error.title,
              messages.SubmitMsg.error.message
            );
          }
          this.leaveForm.reset();
          this.selectedOptionleaveType = undefined;
          this.selectedOptiontag = undefined;
        });
    } else {
      this.taostrService.showError(
        messages.SubmitMsg.error.title,
        messages.SubmitMsg.error.message
      );
    }
  }

  onLeaveSelect(leaveUpdate: any) {
    // console.log(leaveUpdate);
    this.getLeaveUpdate = leaveUpdate;
  }

  // deleteLeave() {
  //   this.leaveService.
  // }
}
