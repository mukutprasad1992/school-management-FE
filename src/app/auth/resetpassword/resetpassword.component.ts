import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { TaostrService } from '../../services/common/taostr.service';
import { messages } from '../../constant/auth/resetPassword.messages';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
})
export class ResetpasswordComponent {
  resetPasswordForm!: FormGroup;
  resetPasswordFetched: any;

  constructor(
    private authService: AuthService,
    private taostrService: TaostrService
  ) {}

  ngOnInit() {
    this.createFormBuilder();
  }

  createFormBuilder() {
    this.resetPasswordForm = new FormGroup({
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmNewPassword: new FormControl('', [Validators.required]),
    });
  }

  get currentPassword() {
    return this.resetPasswordForm.get('currentPassword')!;
  }

  get newPassword() {
    return this.resetPasswordForm.get('newPassword')!;
  }

  get confirmNewPassword() {
    return this.resetPasswordForm.get('confirmNewPassword')!;
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      this.authService
        .resetPasswod('users/reset-password', this.resetPasswordForm.value)
        .subscribe((response) => {
          if (response.status) {
            this.taostrService.showSuccess(
              messages.resetPassword.success.title,
              messages.resetPassword.success.message
            );
            this.resetPasswordFetched = response.result;
          } else {
            this.taostrService.showSuccess(
              messages.resetPassword.error.title,
              messages.resetPassword.error.message
            );
          }
        });
    } else {
      this.taostrService.showSuccess(
        messages.resetPassword.error.title,
        messages.resetPassword.error.message
      );
    }
  }
}
