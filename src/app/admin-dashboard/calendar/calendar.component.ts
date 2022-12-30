import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { throwError } from 'rxjs';

export interface PhotosApi {
  albumId?: number;
  id?: number;
  title?: string;
  url?: string;
  thumbnailUrl?: string;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  constructor(private readonly http: HttpClient) { }
  apiData: any;
  Events: any[] = [];
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth',
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
    this.fetch();
  }

  fetch() {
    const api = `https://jsonplaceholder.typicode.com/albums/1/photos?_start=0&_limit=${this.limit}`;
    const http$ = this.http.get<PhotosApi>(api);

    http$.subscribe(
      (res) => (this.apiData = res),
      (err) => throwError(err)
    );
  }
}
