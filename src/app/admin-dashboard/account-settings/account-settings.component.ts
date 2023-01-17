import { Component } from '@angular/core';
import { AccountSettingService } from '../../services/admin-dasboard/account-settings.service';
import { TaostrService } from '../../services/common/taostr.service';
import { messages } from '../../constant/admin-dashboard/account-setting.messages';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
})
export class AccountSettingsComponent {
  getAllAccountSettingFetched: any;
  accountSettingForm!: FormGroup;
  allRoles: any = [];

  constructor(
    private router: Router,
    private accountSettingService: AccountSettingService,
    private taostrService: TaostrService
  ) {}

  ngOnInit() {
    this.createFormBuilder();
    this.getAllAccountSetting();
    this.getAllRoles();
  }

  getAllRoles() {
    this.accountSettingService.getAllRoles('roles').subscribe((response) => {
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
  }
  createFormBuilder() {
    this.accountSettingForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      mobileNumber: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      roleId: new FormControl('', [Validators.required]),
    });
  }

  get firstName() {
    return this.accountSettingForm.get('firstName')!;
  }

  get lastName() {
    return this.accountSettingForm.get('lastName')!;
  }

  get mobileNumber() {
    return this.accountSettingForm.get('mobileNumber')!;
  }

  get email() {
    return this.accountSettingForm.get('email')!;
  }

  get roleId() {
    return this.accountSettingForm.get('roleId')!;
  }

  getAllAccountSetting() {
    this.accountSettingService
      .getAllAccountSetting('users')
      .subscribe((response) => {
        if (response.status) {
          this.taostrService.showSuccess(
            messages.AccountSettings.success.title,
            messages.AccountSettings.success.message
          );
          this.getAllAccountSettingFetched = response.result;
          this.accountSettingForm.patchValue({
            firstName: this.getAllAccountSettingFetched.firstName,
            lastName: this.getAllAccountSettingFetched.lastName,
            email: this.getAllAccountSettingFetched.email,
            mobileNumber: this.getAllAccountSettingFetched.mobileNumber,
            roleId: this.getAllAccountSettingFetched.role._id,
          });
        } else {
          this.taostrService.showSuccess(
            messages.AccountSettings.error.title,
            messages.AccountSettings.error.message
          );
        }
      });
  }

  onSubmit() {
    if (this.accountSettingForm.valid) {
      this.accountSettingService
        .updateUser('users', this.accountSettingForm.value)
        .subscribe((response) => {
          if (response.status) {
            this.taostrService.showSuccess(
              messages.updateUser.success.title,
              messages.updateUser.success.message
            );
            this.router.navigate(['admin/dashboard/landing']);
          } else {
            this.taostrService.showSuccess(
              messages.updateUser.error.title,
              messages.updateUser.error.message
            );
          }
        });
    } else {
      this.taostrService.showError(
        messages.updateUser.error.title,
        messages.updateUser.error.message
      );
    }
  }
}
