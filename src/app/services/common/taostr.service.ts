import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class TaostrService {
  constructor(private toastr: ToastrService) {}

  showSuccess(title: string, message: string) {
    this.toastr.success(title, message, { timeOut: 3000 });
  }

  showError(title: string, message: string) {
    this.toastr.error(title, message, { timeOut: 3000 });
  }
}
