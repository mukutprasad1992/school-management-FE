import { Component } from '@angular/core';
import { SignupService } from '../../services/auth/signup.service';
import { TaostrService } from '../../services/common/taostr.service';
import { messages } from '../../constant/auth/signup.messages';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignUpComponent {
  constructor(
    private signupService: SignupService,
    private taostrService: TaostrService
  ) {}

  allRoles: any = [];

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
  }

  onRoleChange(getRole: any) {
    console.log(getRole.target.value);
  }
}
