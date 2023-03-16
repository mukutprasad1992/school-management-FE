import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { throwError } from 'rxjs';
import { AttendanceService } from '../../../services/admin-dasboard/attendance.service';
import { TaostrService } from '../../../services/common/taostr.service';
import { messages } from '../../../constant/admin-dashboard/attendance-submit.message';

export interface PhotosApi {
  albumId?: number;
  id?: number;
  title?: string;
  url?: string;
  thumbnailUrl?: string;
}

export interface Student {
  student?: string;
  status?: string;
  rollNo?: string;
}
@Component({
  selector: 'app-attendance-submit',
  templateUrl: './attendance-submit.component.html',
  styleUrls: ['./attendance-submit.component.scss'],
})
export class AttendanceSubmitComponent {
  constructor(
    private readonly http: HttpClient,
    private attendanceService: AttendanceService,
    private taostrService: TaostrService
  ) {}

  StudentProfilePic: any;
  apiData: any;
  Events: any[] = [];
  getSingleClass: any;
  allClasses: any = [];
  getClassData: any = [];
  getStudenstOfClass: any = [];
  getAttendanceData: any = [];
  getAttendanceClass: any;
  getAttendanceDate: any;
  studentPic: any;
  imageBaseUrl: string =
    'https://schoolmanagementimage.s3.ap-south-1.amazonaws.com';

  selectClass: any;
  selectDate: any;
  onSubmitValidation: boolean = false;
  getCurrentStudent: any;

  prepareAttendanceSheet = {
    class: '',
    dateOfAttendance: '',
    students: [] as Object[],
  };

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'title',
      right: 'prev,next',
    },
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
    plugins: [dayGridPlugin, interactionPlugin],
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    events: [{ title: 'Attendence Pending', start: new Date() }],
  };

  handleDateClick(arg: any) {
    console.info('date click! ' + typeof arg.dateStr);
    this.getAttendanceDate = arg.dateStr;
    this.prepareAttendanceSheet.dateOfAttendance = arg.dateStr;
    this.selectDate = arg.dateStr;
  }

  limit: number = 100; // <==== Edit this number to limit API results
  customOptions: OwlOptions = {
    loop: false,
    autoplay: false,
    center: false,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 1,
      },
      500: {
        items: 2,
      },
      940: {
        items: 3,
      },
    },
    nav: true,
  };

  ngOnInit() {
    this.getClassAttendance();
    this.getAllClasses();
    this.getClasesFetched();
    this.fetch();
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

  getClassAttendance() {
    this.attendanceService
      .getClassAttendance('attendances')
      .subscribe((response) => {
        if (response.status) {
          this.taostrService.showSuccess(
            messages.ClassAttendance.success.title,
            messages.ClassAttendance.success.message
          );
          this.getClassData = response.result;
          //this.totalCount = response.result.length;
        } else {
          this.taostrService.showError(
            messages.ClassAttendance.error.title,
            messages.ClassAttendance.error.message
          );
        }
      });
  }

  getClasesFetched() {
    this.attendanceService
      .getClasesFetched('classes/63343f2174d45978bfc7d0dd')
      .subscribe((response) => {
        if (response.status) {
          this.taostrService.showSuccess(
            messages.ClassFetched.success.title,
            messages.ClassFetched.success.message
          );
          this.getClassData = response.result;
          //this.totalCount = response.result.length;
        } else {
          this.taostrService.showError(
            messages.ClassFetched.error.title,
            messages.ClassFetched.error.message
          );
        }
      });
  }

  onButtonClick(getClass: any) {
    this.getAllClasses();
    this.getSingleClass = getClass;
    this.getAttendanceClass = getClass._id;
    this.prepareAttendanceSheet.class = getClass._id;
    this.selectClass = this.getAttendanceClass;
    this.attendanceService
      .classStudent(`classesStudents/getAllClassStudents/${getClass._id}`)
      .subscribe((response) => {
        if (response.status) {
          this.getClassAttendance();
          // this.taostrService.showSuccess(
          //   messages.Onsubmit.success.title,
          //   messages.Onsubmit.success.message
          // );
          this.getStudenstOfClass = response.result;
        } else {
          // this.taostrService.showError(
          //   messages.Onsubmit.error.title,
          //   messages.Onsubmit.error.message
          // );
        }
      });
  }

  getAttendance() {
    this.attendanceService
      .getAttendance('attendances/633c04acf1ca3aedd2104fbd')
      .subscribe((response) => {
        if (response.status) {
          this.taostrService.showSuccess(
            messages.GetAttendance.success.title,
            messages.GetAttendance.success.message
          );
          this.getAllClasses();
          this.getAttendanceData = response.result;
        } else {
          this.taostrService.showError(
            messages.GetAttendance.error.title,
            messages.GetAttendance.error.message
          );
        }
      });
  }

  // onStudentProfilePic(event: any) {
  //   this.StudentProfilePic = event.target.files[0];
  //   // schoolFormData.append('schoolLogo', this.studentPic, this.studentPic.name);
  //   // schoolFormData.append('schoolId', '63d10ba6b7d93566cd279e4b');
  //   this.attendanceService
  //     .uploadStudentPic('schools/school-logo-upload')
  //     .subscribe((response) => {
  //       if (response.status) {
  //         this.studentPic = `${this.imageBaseUrl}/${response.result.StudentProfilePic}`;
  //   this.taostrService.showSuccess(
  //     messages.SchoolLogo.success.title,
  //     messages.SchoolLogo.success.message
  //   );
  // }
  // else {
  //   this.taostrService.showSuccess(
  //     messages.SchoolLogo.error.title,
  //     messages.SchoolLogo.error.message
  //   );
  // }
  // });
  // }

  getStudentsId(studentId: string, status: string) {
    console.log(studentId, status);
  }

  getClassRow(classRow: any) {
    //@TODO Get all students of this class and put in the below list
  }

  fetch() {
    const api = `https://jsonplaceholder.typicode.com/albums/1/photos?_start=0&_limit=${this.limit}`;
    const http$ = this.http.get<PhotosApi>(api);

    http$.subscribe(
      (res) => (this.apiData = res),
      (err) => throwError(err)
    );
  }

  createAttendance() {
    this.onSubmitValidation = true;
    //console.info('Get Data', this.prepareAttendanceSheet);
    this.attendanceService
      .createAttendance('attendances', this.prepareAttendanceSheet)
      .subscribe((response) => {
        if (response.status) {
          this.taostrService.showSuccess(
            messages.CreateAttendance.success.title,
            messages.CreateAttendance.success.message
          );
        } else {
          this.taostrService.showError(
            messages.CreateAttendance.error.title,
            messages.CreateAttendance.error.message
          );
        }
      });
  }

  onClick(student: any) {
    console.log(student);
    this.getCurrentStudent = student;
  }

  makeAttendance(status: string, getCurrentStudent: any) {
    console.log(status, getCurrentStudent);
    let data = {
      student: getCurrentStudent.student._id,
      status: status,
      rollNo: getCurrentStudent.rollNo,
      firstName: getCurrentStudent.student.firstName,
      lastName: getCurrentStudent.student.lastName,
    };
    this.prepareAttendanceSheet.students.push(data);
  }
}
