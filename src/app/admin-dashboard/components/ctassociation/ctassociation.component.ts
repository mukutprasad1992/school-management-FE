import { Component } from '@angular/core';
import { CtAssociationService } from '../../../services/admin-dasboard/ctassociation.service';
import { TaostrService } from '../../../services/common/taostr.service';
import { messages } from '../../../constant/admin-dashboard/ctassociation.message';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { defaultPagination } from '../../../constant/admin-dashboard/pagination.constant';
@Component({
  selector: 'app-ctassociation',
  templateUrl: './ctassociation.component.html',
  styleUrls: ['./ctassociation.component.scss'],
})
export class CTAssociationComponent {
  ctAssociationForm!: FormGroup;

  page: number = defaultPagination.defaultPage;
  totalCount: number = defaultPagination.defaultTotalCount;
  tableSize: number = defaultPagination.defaultTableSize;

  constructor(
    private ctAssociationService: CtAssociationService,
    private taostrService: TaostrService
  ) {}

  selectedOptionTeacher: any;
  selectedOptionClass: any;
  allClasses: any = [];
  allTeachers: any = [];
  getClassTeacherAssociationData: any = [];
  teacherAssociation: any;

  ngOnInit() {
    this.getAllClasses();
    this.getAllTeachers();
    this.getClassTeacherAssociation();
    this.createFormBuilder();
  }

  createFormBuilder() {
    this.ctAssociationForm = new FormGroup({
      class: new FormControl('', [Validators.required]),
      teacher: new FormControl('', [Validators.required]),
      employeeId: new FormControl('', [Validators.required]),
    });
  }

  get class() {
    return this.ctAssociationForm.get('class')!;
  }
  get teacher() {
    return this.ctAssociationForm.get('teacher')!;
  }
  get employeeId() {
    return this.ctAssociationForm.get('employeeId')!;
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

  getClassTeacherAssociation() {
    this.ctAssociationService
      .getClassTeacherAssociation('classesTeachers')
      .subscribe((response) => {
        if (response.status) {
          this.taostrService.showSuccess(
            messages.CTassociations.success.title,
            messages.CTassociations.success.message
          );
          this.getClassTeacherAssociationData = response.result;
          this.totalCount = response.result.length;
        } else {
          this.taostrService.showSuccess(
            messages.CTassociations.error.title,
            messages.CTassociations.error.message
          );
        }
      });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getClassTeacherAssociation();
  }

  onSubmit() {
    if (this.ctAssociationForm.valid) {
      this.ctAssociationService
        .createClassTeacher('classesTeachers', this.ctAssociationForm.value)
        .subscribe((response) => {
          if (response.status) {
            this.getClassTeacherAssociation();
            this.taostrService.showSuccess(
              messages.Onsubmit.success.title,
              messages.Onsubmit.success.message
            );
          } else {
            this.taostrService.showError(
              messages.Onsubmit.error.title,
              messages.Onsubmit.error.message
            );
          }
          this.ctAssociationForm.reset();
          this.selectedOptionTeacher = undefined;
          this.selectedOptionClass = undefined;
        });
    } else {
      this.taostrService.showError(
        messages.Onsubmit.error.title,
        messages.Onsubmit.error.message
      );
    }
  }

  onTeacherAssociation(classTeacherAssociation: any) {
    this.teacherAssociation = classTeacherAssociation;
  }
}
