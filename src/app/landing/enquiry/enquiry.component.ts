import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.scss'],
})
export class EnquiryComponent {
  enquiryForm!: FormGroup;

  ngOnInit() {
    this.createFormBuilder();
  }

  createFormBuilder() {
    this.enquiryForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      mobileNumber: new FormControl('', [Validators.required]),
    });
  }

  get firstName() {
    return this.enquiryForm.get('firstName')!;
  }
  get lastName() {
    return this.enquiryForm.get('lastName')!;
  }
  get email() {
    return this.enquiryForm.get('email')!;
  }
  get mobileNumber() {
    return this.enquiryForm.get('mobileNumber')!;
  }

  onSubmit() {
    if (this.enquiryForm.valid) {
      console.log('this.enquiryForm.value', this.enquiryForm.value);
    }
  }
}
