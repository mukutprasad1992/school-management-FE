import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AttendanceService } from '../../../services/admin-dasboard/attendance.service';
import { defaultPagination } from '../../../constant/admin-dashboard/pagination.constant';

@Component({
  selector: 'app-attendance-sheet',
  templateUrl: './attendance-sheet.component.html',
  styleUrls: ['./attendance-sheet.component.scss'],
})
export class AttendanceSheetComponent {
  public getClassStudentAttendance: any;

  page: number = defaultPagination.defaultPage;
  totalCount: number = defaultPagination.defaultTotalCount;
  tableSize: number = defaultPagination.defaultTableSize;
  attedanceSheetForm!: FormGroup;

  getAllClassStudentAttendance: any;

  allClasses: any = [];
  getAllAttendance: any;

  constructor(private attendanceService: AttendanceService) {}

  ngOnInit() {
    this.getAllClasses();
    this.createFormBuilder();
    this.getAttendanceData();
    this.getUserByLocalStorage();
  }

  createFormBuilder() {
    this.attedanceSheetForm = new FormGroup({
      class: new FormControl('', [Validators.required]),
      dateOfAttendance: new FormControl('', [Validators.required]),
    });
  }

  get class() {
    return this.attedanceSheetForm.get('class')!;
  }
  get dateOfAttendance() {
    return this.attedanceSheetForm.get('dateOfAttendance')!;
  }

  getAllClasses() {
    this.attendanceService.getAllClasses('classes').subscribe((response) => {
      if (response.status) {
        // this.taostrService.showSuccess(
        //   messages.Classes.success.title,
        //   messages.Classes.success.message
        // );
        this.allClasses = response.result;
        // } else {
        // this.taostrService.showSuccess(
        //   messages.Classes.error.title,
        //   messages.Classes.error.message
        // );
      }
    });
  }

  onSubmit() {
    if (this.attedanceSheetForm.valid) {
      console.log(this.attedanceSheetForm.value);
    }
  }

  getAttendanceData() {
    this.attendanceService
      .getAttendanceData('attendances')
      //console.info('Get Data', this.prepareAttendanceSheet);
      .subscribe((response) => {
        if (response.status) {
          //   this.taostrService.showSuccess(
          //     messages.CreateAttendance.success.title,
          //     messages.CreateAttendance.success.message
          //   );

          this.getClassStudentAttendance = response.result;
          // this.getAllAttendance = response.result;
          this.totalCount = response.result.length;
          // } else {
          //   this.taostrService.showError(
          //     messages.CreateAttendance.error.title,
          //     messages.CreateAttendance.error.message
          //   );
        }
      });
  }

  getUserByLocalStorage() {
    const getStringifyUser: any = localStorage.getItem('user');
    this.getClassStudentAttendance = JSON.parse(getStringifyUser);
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getAttendanceData();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAttendanceData();
  }
}
