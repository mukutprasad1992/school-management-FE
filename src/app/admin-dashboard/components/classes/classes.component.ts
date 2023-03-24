import { Component } from '@angular/core';
import { ClassService } from '../../../services/admin-dasboard/class.service';
import { TaostrService } from '../../../services/common/taostr.service';
import { messages } from '../../../constant/admin-dashboard/class.messages';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { defaultPagination } from '../../../constant/admin-dashboard/pagination.constant';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
})
export class ClassesComponent {
  classForm!: FormGroup;

  page: number = defaultPagination.defaultPage;
  totalCount: number = defaultPagination.defaultTotalCount;
  tableSize: number = defaultPagination.defaultTableSize;

  getAllClasesFetched: any;
  public getUser: any;

  constructor(
    private classService: ClassService,
    private taostrService: TaostrService
  ) { }

  getClassTeacherData: any = [];
  allClasses: any = [];
  allTeachers: any = [];
  allSchools: any = [];
  selectedOptionSchool: any;
  getClassesUpdate: any;
  getCurrentClassRow: any;

  ngOnInit() {
    this.getAllClasses();
    this.getUserByLocalStorage();
    this.createFormBuilder();
    this.getAllSchools();
  }

  createFormBuilder() {
    this.classForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      school: new FormControl('', [Validators.required]),
    });
  }

  get name() {
    return this.classForm.get('name')!;
  }
  get school() {
    return this.classForm.get('school')!;
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
        this.taostrService.showError(
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

  getAllSchools() {
    this.classService.getSelectSchool('schools').subscribe((response) => {
      if (response.status) {
        this.taostrService.showSuccess(
          messages.Classes.success.title,
          messages.Classes.success.message
        );
        this.allSchools = response.result;
      } else {
        this.taostrService.showError(
          messages.Classes.error.title,
          messages.Classes.error.message
        );
      }
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getAllSchools();
  }

  getAllStatusUpdate(classId: string, status: string) {
    this.classService
      .getAllStatusUpdate(`classes/status/${classId}`, {
        status,
      })
      .subscribe((response) => {
        if (response.status) {
          this.taostrService.showSuccess(
            messages.updateStatus.success.title,
            messages.updateStatus.success.message
          );
          this.getAllClasses();
        } else {
          this.taostrService.showError(
            messages.updateStatus.error.title,
            messages.updateStatus.error.message
          );
        }
      });
  }

  onSubmit() {
    if (this.classForm.valid) {
      this.classService
        .createClass('classes', this.classForm.value)
        .subscribe((response) => {
          if (response.status) {
            this.getAllClasses();
            this.taostrService.showSuccess(
              messages.Createclass.success.title,
              messages.Createclass.success.message
            );
          } else {
            this.taostrService.showError(
              messages.Createclass.error.title,
              messages.Createclass.error.message
            );
          }
          this.classForm.reset();
          // this.selectedOptionschool = undefined;
        });
    } else {
      this.taostrService.showError(
        messages.Createclass.error.title,
        messages.Createclass.error.message
      );
    }
  }

  onClassSelect(getClass: any) {
    // console.log(getClass);
    this.getClassesUpdate = getClass;
  }

  // makeAttendance(getClassesUpdate: any) {
  //   console.log(getCurrentStudent);
  //   let data = {
  //     student: getCurrentStudent.student._id,
  //     status: status,
  //     rollNo: getCurrentStudent.rollNo,
  //     firstName: getCurrentStudent.student.firstName,
  //     lastName: getCurrentStudent.student.lastName,
  //   };
  //  // this.prepareAttendanceSheet.students.push(data);
  // }

  deleteClass(class_Id: string) {
    this.classService
      .deleteClass(`classes/${class_Id}`)
      .subscribe((response) => {
        console.log('class is deleted', class_Id);
        if (response.status) {
          this.taostrService.showSuccess(
            messages.deleteClass.success.title,
            messages.deleteClass.success.message
          );
          this.getAllClasses();
        } else {
          this.taostrService.showError(
            messages.deleteClass.error.title,
            messages.deleteClass.error.message
          );
        }
      });
  }

  onClick(classRow: any) {
    console.log(classRow);
    this.getCurrentClassRow = classRow;
  }

  deleteClassRow() { }
}
