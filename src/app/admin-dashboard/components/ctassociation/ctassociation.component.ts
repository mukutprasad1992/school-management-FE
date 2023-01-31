import { Component } from '@angular/core';
import { CtAssociationService } from '../../../services/admin-dasboard/ctassociation.service';
import { TaostrService } from '../../../services/common/taostr.service';
import { messages } from '../../../constant/admin-dashboard/ctassociation.message';

@Component({
  selector: 'app-ctassociation',
  templateUrl: './ctassociation.component.html',
  styleUrls: ['./ctassociation.component.scss'],
})
export class CTAssociationComponent {
  constructor(
    private ctAssociationService: CtAssociationService,
    private taostrService: TaostrService
  ) {}
  selectedOption: any;
  allClasses: any = [];
  allTeachers: any = [];

  ngOnInit() {
    this.getAllClasses();
    this.getAllTeachers();
  }

  getAllClasses() {
    this.ctAssociationService.getAllClasses('classes').subscribe((response) => {
      if (response.status) {
        this.taostrService.showSuccess(
          messages.Classes.success.title,
          messages.Classes.success.message
        );
        this.allClasses = response.result;
      } else {
        this.taostrService.showSuccess(
          messages.Classes.error.title,
          messages.Classes.error.message
        );
      }
    });
  }

  getAllTeachers() {
    this.ctAssociationService
      .getAllTeachers('users/all-users/6332d0c50c5e58b0b0e3c16e')
      .subscribe((response) => {
        if (response.status) {
          this.taostrService.showSuccess(
            messages.Teachers.success.title,
            messages.Teachers.success.message
          );
          this.allTeachers = response.result;
        } else {
          this.taostrService.showSuccess(
            messages.Teachers.error.title,
            messages.Teachers.error.message
          );
        }
      });
  }
}
