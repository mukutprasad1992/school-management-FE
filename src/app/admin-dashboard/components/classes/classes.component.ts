import { Component } from '@angular/core';
import { ClassService } from '../../../services/admin-dasboard/class.service';
import { TaostrService } from '../../../services/common/taostr.service';
import { messages } from '../../../constant/admin-dashboard/class.messages';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
})
export class ClassesComponent {
  getAllClasesFetched: any;
  public getUser: any;

  constructor(
    private classService: ClassService,
    private taostrService: TaostrService
  ) {}

  ngOnInit() {
    this.getAllClasses();
    this.getUserByLocalStorage();
  }

  getAllClasses() {
    this.classService.getAllClasses('classes').subscribe((response) => {
      if (response.status) {
        this.taostrService.showSuccess(
          messages.Classes.success.title,
          messages.Classes.success.message
        );
        this.getAllClasesFetched = response.result;
      } else {
        this.taostrService.showSuccess(
          messages.Classes.error.title,
          messages.Classes.error.message
        );
      }
    });
  }

  getUserByLocalStorage() {
    const getStringifyUser: any = localStorage.getItem('user');
    this.getUser = JSON.parse(getStringifyUser);
  }
}
