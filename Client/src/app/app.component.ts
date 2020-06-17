import { Component } from '@angular/core';

import { ApiService } from './apiService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'client';
  status = null;
  accessToken = null;

  constructor(apiService: ApiService) {
    apiService.getStatus().then((data) => (this.status = data.status));
    this.accessToken = localStorage.getItem('accessToken');
  }
  logout() {
    localStorage.removeItem('accessToken');
    window.location.reload();
  }
}
