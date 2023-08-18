import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AttendanceService } from '../../../services/admin-dasboard/attendance.service';
import { defaultPagination } from '../../../constant/admin-dashboard/pagination.constant';
import { TaostrService } from '../../../services/common/taostr.service';
import { messages } from '../../../constant/admin-dashboard/attendance-sheet.message';

@Component({
  selector: 'app-attendance-sheet',
  templateUrl: './attendance-sheet.component.html',
  styleUrls: ['./attendance-sheet.component.scss'],
})
export class AttendanceSheetComponent {
  public getClassStudentAttendance: any;
  finalClassStudentAttendence: any = [];

  page: number = defaultPagination.defaultPage;
  totalCount: number = defaultPagination.defaultTotalCount;
  tableSize: number = defaultPagination.defaultTableSize;

  attedanceSheetForm!: FormGroup;

  getAllClassStudentAttendance: any;
  getAttendanceUpdate: any;

  allClasses: any = [];
  getAllAttendance: any;
  deleteattendanceSheetRow: any;
  attendanceByClassAndDateSheetRow: any;


  constructor(
    private attendanceService: AttendanceService,
    private taostrService: TaostrService
  ) { }

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
        this.taostrService.showSuccess(
          messages.Classes.success.title,
          messages.Classes.success.message
        );
        this.allClasses = response.result;
      } else {
        this.taostrService.showError(
          messages.Classes.error.title,
          messages.Classes.error.message
        );
      }
    });
  }

  onSubmit() {
    console.info("attedanceSheetForm : ", this.attedanceSheetForm.value)
    if (this.attedanceSheetForm.valid) {
      this.attendanceService
        .getAttendanceDateAndClass(`attendances/${this.attedanceSheetForm.value.class}/${this.attedanceSheetForm.value.dateOfAttendance}`)
        .subscribe((response) => {
          console.info("response", response)
          this.finalClassStudentAttendence = [];
          if (response.status) {
            this.getClassStudentAttendance = response.result;
            for (
              let attendance = 0;
              attendance < this.getClassStudentAttendance.length;
              attendance++
            ) {
              if (
                this.getClassStudentAttendance[attendance] &&
                this.getClassStudentAttendance[attendance].students.length
              ) {
                for (
                  let student = 0;
                  student <
                  this.getClassStudentAttendance[attendance].students.length;
                  student++
                ) {
                  this.finalClassStudentAttendence.push({
                    _id: this.getClassStudentAttendance[attendance]._id,
                    class: this.getClassStudentAttendance[attendance].class.name,
                    dateOfAttendance:
                      this.getClassStudentAttendance[attendance].dateOfAttendance,
                    status:
                      this.getClassStudentAttendance[attendance].students[student]
                        .status,
                    firstName:
                      this.getClassStudentAttendance[attendance].students[student]
                        .student.firstName,
                    lastName:
                      this.getClassStudentAttendance[attendance].students[student]
                        .student.lastName,
                    rollNo:
                      this.getClassStudentAttendance[attendance].students[student]
                        .rollNo,
                  });
                }
              }
            }
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
          this.createFormBuilder()
        });
    } else {
      this.taostrService.showError(
        messages.Onsubmit.error.title,
        messages.Onsubmit.error.message
      );
    }
  }

  getAttendanceData() {
    this.attendanceService
      .getAttendanceData('attendances')
      .subscribe((response) => {
        if (response.status) {
          this.getClassStudentAttendance = response.result;
          for (
            let attendance = 0;
            attendance < this.getClassStudentAttendance.length;
            attendance++
          ) {
            if (
              this.getClassStudentAttendance[attendance] &&
              this.getClassStudentAttendance[attendance].students.length
            ) {
              for (
                let student = 0;
                student <
                this.getClassStudentAttendance[attendance].students.length;
                student++
              ) {
                this.finalClassStudentAttendence.push({
                  _id: this.getClassStudentAttendance[attendance]._id,
                  class: this.getClassStudentAttendance[attendance].class.name,
                  dateOfAttendance:
                    this.getClassStudentAttendance[attendance].dateOfAttendance,
                  status:
                    this.getClassStudentAttendance[attendance].students[student]
                      .status,
                  firstName:
                    this.getClassStudentAttendance[attendance].students[student]
                      .student.firstName,
                  lastName:
                    this.getClassStudentAttendance[attendance].students[student]
                      .student.lastName,
                  rollNo:
                    this.getClassStudentAttendance[attendance].students[student]
                      .rollNo,
                });
              }
            }
          }
          this.taostrService.showSuccess(
            messages.GetAttendance.success.title,
            messages.GetAttendance.success.message
          );
        } else {
          this.taostrService.showError(
            messages.GetAttendance.error.title,
            messages.GetAttendance.error.message
          );
        }
      });
  }

  getUserByLocalStorage() {
    const getStringifyUser: any = localStorage.getItem('user');
    this.getClassStudentAttendance = JSON.parse(getStringifyUser);
  }

  onTableDataChange(event: any) {
    this.page = event;
    // this.getAttendanceData();
  }

  onAttendanceUpdate(getAttendanceUpdate: any) {
    this.getAttendanceUpdate = getAttendanceUpdate;
  }

  onClick(attendanceSheetRow: any) {
    this.deleteattendanceSheetRow = attendanceSheetRow;
  }



  deleteAttendanceRow(action: any, deleteattendanceSheetRow: any) {
    this.attendanceService
      .deleteAttendance(`attendances/${deleteattendanceSheetRow._id}`)
      .subscribe((response) => {
        if (response.status) {
          this.taostrService.showSuccess(
            messages.deleteAttendanceSheet.success.title,
            messages.deleteAttendanceSheet.success.message
          );
          // this.getAttendanceData();
        } else {
          this.taostrService.showError(
            messages.deleteAttendanceSheet.error.title,
            messages.deleteAttendanceSheet.error.message
          );
        }
      });
  }

}
