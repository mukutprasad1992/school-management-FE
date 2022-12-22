import { Component } from '@angular/core';
import { SignInService } from '../../services/auth/signin.service';
import { TaostrService } from '../../services/common/taostr.service';
import { messages } from '../../constant/auth/signup.messages';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SignInComponent {
  signInForm!: FormGroup;
  getToken: any;

  constructor(
    private SigninService: SignInService,
    private taostrService: TaostrService
  ) {}

  ngOnInit() {
    this.createFormBuilder();
  }

  createFormBuilder() {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get email() {
    return this.signInForm.get('email')!;
  }

  get password() {
    return this.signInForm.get('password')!;
  }

  onSubmit() {
    if (this.signInForm.valid) {
      this.SigninService.signIn('users/login', this.signInForm.value).subscribe(
        (response) => {
          if (response.status) {
            this.getToken = response.token;
            console.info('this.getToken', this.getToken);
            this.taostrService.showSuccess(
              messages.userSignIn.success.title,
              messages.userSignIn.success.message
            );
          } else {
            this.taostrService.showSuccess(
              messages.userSignIn.error.title,
              messages.userSignIn.error.message
            );
          }
        }
      );
    } else {
      this.taostrService.showError(
        messages.userSignIn.error.title,
        messages.userSignIn.error.message
      );
    }
  }
}
