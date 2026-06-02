import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css',
})
export class AdminLogin {
  username = '';
  password = '';
  message = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login() {
    this.http
      .post('http://localhost:8080/admin-login', {
        username: this.username,
        password: this.password,
      }, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          this.message = response;
          if (response.toLowerCase().includes('success')) {
            this.router.navigate(['/farmer-dashboard']);
          }
        },
        error: () => {
          this.message = 'Login Failed';
        },
      });
  }
}
