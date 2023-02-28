import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { throwError } from 'rxjs';
import { AttendanceService } from '../../../services/admin-dasboard/attendance.service';

export interface PhotosApi {
  albumId?: number;
  id?: number;
  title?: string;
  url?: string;
  thumbnailUrl?: string;
}

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent {
  constructor(
    private readonly http: HttpClient,
    private attendanceservice: AttendanceService
  ) {}

  apiData: any;
  Events: any[] = [];
  allClasses: any = [];
  getClassData: any = [];
  // getClassData: any = [];

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
    console.info('date click! ' + arg.dateStr);
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
  }

  getAllClasses() {
    this.attendanceservice.getAllClasses('classes').subscribe((response) => {
      if (response.status) {
        //   this.taostrService.showSuccess(
        //     messages.Classes.success.title,
        //     messages.Classes.success.message
        //   );
        this.allClasses = response.result;
      } else {
        //   this.taostrService.showSuccess(
        //     messages.Classes.error.title,
        //     messages.Classes.error.message
        //   );
      }
    });
  }

  getClassAttendance() {
    this.attendanceservice
      .getClassAttendance('attendances')
      .subscribe((response) => {
        // if (response.status) {
        //   this.taostrService.showSuccess(
        //     messages.CTassociations.success.title,
        //     messages.CTassociations.success.message
        //   );
        this.getClassData = response.result;
        // this.totalCount = response.result.length;
        // } else {
        //   this.taostrService.showError(
        //     messages.CTassociations.error.title,
        //     messages.CTassociations.error.message
        //   );
        // }
      });
  }

  getClassRow(classRow: any) {
    //@TODO Get all students of this class and put in the below list
  }
}
