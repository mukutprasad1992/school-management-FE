import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AttendanceService } from '../../../services/admin-dasboard/attendance.service';

@Component({
  selector: 'app-attendance-sheet',
  templateUrl: './attendance-sheet.component.html',
  styleUrls: ['./attendance-sheet.component.scss'],
})
export class AttendanceSheetComponent {
  attedanceSheetForm!: FormGroup;

  allClasses: any = [];

  constructor(private attendanceService: AttendanceService) {}

  ngOnInit() {
    this.getAllClasses();
    this.createFormBuilder();
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
}
