import { Component } from '@angular/core';
import { ApiService } from '../apiService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  userName = '';
  password = '';
  accessToken = null;

  constructor(private apiService: ApiService) {
    this.accessToken = localStorage.getItem('accessToken');
  }

  login() {
    this.apiService.userLogin(this.userName, this.password).then((user) => {
      localStorage.setItem('accessToken', user.token);
      window.location.reload();
    });
  }
}
