import { Component } from '@angular/core';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.scss'],
})
export class LeavesComponent {
  public getUser: any;

  ngOnInit() {
    this.getUserByLocalStorage();
  }

  getUserByLocalStorage() {
    const getStringifyUser: any = localStorage.getItem('user');
    this.getUser = JSON.parse(getStringifyUser);
  }
}
