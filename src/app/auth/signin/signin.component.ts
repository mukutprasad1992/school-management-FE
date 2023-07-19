import { Component } from '@angular/core';
import { SignInService } from '../../services/auth/signin.service';
import { AuthService } from '../../services/auth/auth.service';
import { TaostrService } from '../../services/common/taostr.service';
import { messages } from '../../constant/auth/signup.messages';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SignInComponent {
  signInForm!: FormGroup;

  constructor(
    private router: Router,
    private SigninService: SignInService,
    private taostrService: TaostrService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.createFormBuilder();
    const getToken = localStorage.getItem('token');
    if (getToken) {
      this.router.navigate(['/admin/dashboard/landing']);
    }
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
            this.authService.saveAuthData(
              response.userDetails.token,
              response.userDetails.user,
              new Date()
            );
            this.taostrService.showSuccess(
              messages.userSignIn.success.title,
              messages.userSignIn.success.message
            );
            this.router.navigate(['admin/dashboard/landing']);
          } else {
            this.taostrService.showError(
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
