import { Component } from '@angular/core';
import { CsAssociationService } from '../../../services/admin-dasboard/csassociation.service';
import { TaostrService } from '../../../services/common/taostr.service';
import { messages } from '../../../constant/admin-dashboard/csassociaton.messages';
import { defaultPagination } from '../../../constant/admin-dashboard/pagination.constant';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-csassociation',
  templateUrl: './csassociation.component.html',
  styleUrls: ['./csassociation.component.scss'],
})
export class CSAssociationComponent {
  csAssociationForm!: FormGroup;

  page: number = defaultPagination.defaultPage;
  totalCount: number = defaultPagination.defaultTotalCount;
  tableSize: number = defaultPagination.defaultTableSize;

  constructor(
    private csAssociationService: CsAssociationService,
    private taostrService: TaostrService
  ) {}

  selectedOptionClass: any;
  selectedOptionStudent: any;
  allClasses: any = [];
  allStudents: any = [];
  allClassStudentAssociation: any = [];

  ngOnInit() {
    this.getAllClasses();
    this.getAllStudents();
    this.getClassStudentAssociation();
    this.createFormBuilder();
  }

  createFormBuilder() {
    this.csAssociationForm = new FormGroup({
      class: new FormControl('', [Validators.required]),
      student: new FormControl('', [Validators.required]),
      rollNo: new FormControl('', [Validators.required]),
    });
  }

  get class() {
    return this.csAssociationForm.get('class')!;
  }
  get student() {
    return this.csAssociationForm.get('student')!;
  }
  get rollNo() {
    return this.csAssociationForm.get('rollNo')!;
  }

  getAllClasses() {
    this.csAssociationService.getAllClasses('classes').subscribe((response) => {
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

  getAllStudents() {
    this.csAssociationService
      .getAllStudents('users/all-users/6332d11f0c5e58b0b0e3c17a')
      .subscribe((response) => {
        if (response.status) {
          this.taostrService.showSuccess(
            messages.Students.success.title,
            messages.Students.success.message
          );
          this.allStudents = response.result;
        } else {
          this.taostrService.showSuccess(
            messages.Students.error.title,
            messages.Students.error.message
          );
        }
      });
  }

  getClassStudentAssociation() {
    this.csAssociationService
      .getClassStudentAssociation('classesStudents')
      .subscribe((response) => {
        if (response.status) {
          this.taostrService.showSuccess(
            messages.CSassociations.success.title,
            messages.CSassociations.success.message
          );
          this.allClassStudentAssociation = response.result;
          this.totalCount = response.result.length;
        } else {
          this.taostrService.showSuccess(
            messages.CSassociations.error.title,
            messages.CSassociations.error.message
          );
        }
      });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getClassStudentAssociation();
  }

  onSubmit() {
    if (this.csAssociationForm.valid) {
      this.csAssociationService
        .createClassStudent('classesStudents', this.csAssociationForm.value)
        .subscribe((response) => {
          if (response.status) {
            this.getClassStudentAssociation();
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
          this.csAssociationForm.reset();
          this.selectedOptionClass = undefined;
          this.selectedOptionStudent = undefined;
        });
    } else {
      this.taostrService.showError(
        messages.Onsubmit.error.title,
        messages.Onsubmit.error.message
      );
    }
  }
}
