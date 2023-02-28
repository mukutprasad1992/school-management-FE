import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaostrService } from '../../../services/common/taostr.service';
import { HeaderService } from '../../../services/admin-dasboard/header.services';
import { messages } from '../../../constant/admin-dashboard/header.messages';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  profilePicUrl: any;
  imageBaseUrl: string =
    'https://schoolmanagementimage.s3.ap-south-1.amazonaws.com';

  constructor(
    private router: Router,
    private headerService: HeaderService,
    private taostrService: TaostrService
  ) {}

  ngOnInit() {
    this.getUser();
  }

  onLogout() {
    localStorage.clear();
    this.router.navigate(['/landing/home']);
  }

  getUser() {
    this.headerService.getUser('users').subscribe((response) => {
      if (response.status) {
        this.taostrService.showSuccess(
          messages.ProfilePic.fetched.title,
          messages.ProfilePic.fetched.message
        );
        this.profilePicUrl = `${this.imageBaseUrl}/${response.result.profilePic}`;
      } else {
        this.taostrService.showError(
          messages.ProfilePic.error.title,
          messages.ProfilePic.error.message
        );
      }
    });
  }
}
