import { Component } from '@angular/core';
import { SignupService } from '../../services/auth/signup.service';
import { TaostrService } from '../../services/common/taostr.service';
import { messages } from '../../constant/auth/signup.messages';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignUpComponent {
  signUpForm!: FormGroup;
  allRoles: any = [];

  constructor(
    private signupService: SignupService,
    private taostrService: TaostrService
  ) {}

  ngOnInit() {
    this.signupService.getAllRoles('roles').subscribe((response) => {
      console.log('data response', response);
      if (response.status) {
        this.allRoles = response.result;
        this.taostrService.showSuccess(
          messages.roles.success.title,
          messages.roles.success.message
        );
      } else {
        this.taostrService.showSuccess(
          messages.roles.error.title,
          messages.roles.error.message
        );
      }
    });

    this.signUpForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobileNumber: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      comfirmpassword: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
    });
  }

  get firstName() {
    return this.signUpForm.get('firstName')!;
  }
  get lastName() {
    return this.signUpForm.get('lastName')!;
  }
  get email() {
    return this.signUpForm.get('email')!;
  }
  get mobileNumber() {
    return this.signUpForm.get('mobileNumber')!;
  }
  get password() {
    return this.signUpForm.get('password')!;
  }
  get comfirmpassword() {
    return this.signUpForm.get('comfirmpassword')!;
  }
  get role() {
    return this.signUpForm.get('role')!;
  }

  onRoleChange(getRole: any) {
    console.log(getRole.target.value);
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      alert(
        'Form Submitted succesfully!!!\n Check the values in browser console.'
      );
      console.table(this.signUpForm.value);
    }
  }
}
