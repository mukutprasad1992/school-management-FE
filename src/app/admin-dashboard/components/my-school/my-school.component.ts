import { Component } from '@angular/core';
import { SchoolService } from '../../../services/admin-dasboard/my-school.service';
import { TaostrService } from '../../../services/common/taostr.service';
import { messages } from '../../../constant/admin-dashboard/my-school.message';
import { countryMessages } from '../../../constant/admin-dashboard/country.messages';
import { StateMessages } from '../../../constant/admin-dashboard/state.messages';
import { CityMessages } from '../../../constant/admin-dashboard/city.messages';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-school',
  templateUrl: './my-school.component.html',
  styleUrls: ['./my-school.component.scss'],
})
export class MySchoolComponent {
  schoolProfilePic: any;
  getSchoolFetched: any;
  getAllAccountSettingFetched: any;
  mySchoolForm!: FormGroup;
  allCountry: any = [];
  allState: any = [];
  allCity: any = [];
  schoolLogo: any;
  imageBaseUrl: string =
    'https://schoolmanagementimage.s3.ap-south-1.amazonaws.com';

  constructor(
    private router: Router,
    private schoolService: SchoolService,
    private taostrService: TaostrService
  ) {}

  ngOnInit() {
    this.createFormBuilder();
    this.getSchool();
    this.getAllCountries();
    this.getAllStates();
    this.getAllCities();
  }

  onSchoolLogoChoose(event: any) {
    this.schoolLogo = event.target.files[0];
    const schoolFormData = new FormData(); // For convert in form data
    schoolFormData.append('schoolLogo', this.schoolLogo, this.schoolLogo.name);
    schoolFormData.append('schoolId', '63d10ba6b7d93566cd279e4b');
    this.schoolService
      .uploadSchoolLogo('schools/school-logo-upload', schoolFormData)
      .subscribe((response) => {
        if (response.status) {
          this.schoolProfilePic = `${this.imageBaseUrl}/${response.result.schoolLogo}`;
          this.taostrService.showSuccess(
            messages.SchoolLogo.success.title,
            messages.SchoolLogo.success.message
          );
        } else {
          this.taostrService.showSuccess(
            messages.SchoolLogo.error.title,
            messages.SchoolLogo.error.message
          );
        }
      });
  }

  createFormBuilder() {
    this.mySchoolForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      pinCode: new FormControl('', [Validators.required]),
    });
  }

  get name() {
    return this.mySchoolForm.get('name')!;
  }

  get email() {
    return this.mySchoolForm.get('email')!;
  }

  get phoneNumber() {
    return this.mySchoolForm.get('phoneNumber')!;
  }

  get country() {
    return this.mySchoolForm.get('country')!;
  }

  get state() {
    return this.mySchoolForm.get('state')!;
  }

  get city() {
    return this.mySchoolForm.get('city')!;
  }

  get address() {
    return this.mySchoolForm.get('address')!;
  }

  get pinCode() {
    return this.mySchoolForm.get('pinCode')!;
  }

  getSchool() {
    this.schoolService
      .getSchool('schools/63d10ba6b7d93566cd279e4b')
      .subscribe((response) => {
        if (response.status) {
          console.log(response.result);
          this.taostrService.showSuccess(
            messages.MySchool.success.title,
            messages.MySchool.success.message
          );
          this.getSchoolFetched = response.result;
          this.schoolProfilePic = `${this.imageBaseUrl}/${this.getSchoolFetched.schoolLogo}`;
          this.mySchoolForm.patchValue({
            name: this.getSchoolFetched.name,
            email: this.getSchoolFetched.email,
            phoneNumber: this.getSchoolFetched.phoneNumber,
            country: this.getSchoolFetched.country
              ? this.getSchoolFetched.country._id
              : '',
            state: this.getSchoolFetched.state
              ? this.getSchoolFetched.state._id
              : '',
            city: this.getSchoolFetched.city
              ? this.getSchoolFetched.city._id
              : '',
            address: this.getSchoolFetched.address,
            pinCode: this.getSchoolFetched.pinCode,
          });
        } else {
          this.taostrService.showSuccess(
            messages.MySchool.error.title,
            messages.MySchool.error.message
          );
        }
      });
  }

  getAllCountries() {
    this.schoolService.getAllCountries('countries').subscribe((response) => {
      if (response.status) {
        this.taostrService.showSuccess(
          countryMessages.Country.success.title,
          countryMessages.Country.success.message
        );
        this.allCountry = response.result;
      } else {
        this.taostrService.showSuccess(
          countryMessages.Country.error.title,
          countryMessages.Country.error.message
        );
      }
    });
  }

  getAllStates() {
    this.schoolService.getAllStates('states').subscribe((response) => {
      if (response.status) {
        this.taostrService.showSuccess(
          StateMessages.State.success.title,
          StateMessages.State.success.message
        );
        this.allState = response.result;
      } else {
        this.taostrService.showSuccess(
          StateMessages.State.error.title,
          StateMessages.State.error.message
        );
      }
    });
  }

  getAllCities() {
    this.schoolService.getAllCities('cities').subscribe((response) => {
      if (response.status) {
        this.taostrService.showSuccess(
          CityMessages.City.success.title,
          CityMessages.City.success.message
        );
        this.allCity = response.result;
      } else {
        this.taostrService.showSuccess(
          CityMessages.City.error.title,
          CityMessages.City.error.message
        );
      }
    });
  }

  onSubmit() {
    if (this.mySchoolForm.valid) {
      this.schoolService
        .createSchool('schools', this.mySchoolForm.value)
        .subscribe((response: any) => {
          if (response.status) {
            this.taostrService.showSuccess(
              messages.CreateSchool.success.title,
              messages.CreateSchool.success.message
            );
            this.router.navigate(['admin/dashboard/landing']);
          } else {
            this.taostrService.showSuccess(
              messages.CreateSchool.error.title,
              messages.CreateSchool.error.message
            );
          }
        });
    } else {
      this.taostrService.showError(
        messages.MySchool.error.title,
        messages.MySchool.error.message
      );
    }
  }
}
