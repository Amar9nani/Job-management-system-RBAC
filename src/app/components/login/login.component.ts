import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="login-container">
      <div class="auth-nav">
        <button [routerLink]="['/register']" class="nav-btn">Register</button>
      </div>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
        <h2>Login</h2>
        <div class="form-group">
          <input type="text" formControlName="username" placeholder="Username" />
          <div *ngIf="loginForm.get('username')?.touched && loginForm.get('username')?.invalid" class="error">
            Username is required
          </div>
        </div>
        <div class="form-group">
          <input type="password" formControlName="password" placeholder="Password" />
          <div *ngIf="loginForm.get('password')?.touched && loginForm.get('password')?.invalid" class="error">
            Password is required
          </div>
        </div>
        <button type="submit" [disabled]="loading || !loginForm.valid">
          {{ loading ? 'Loading...' : 'Login' }}
        </button>
        <p *ngIf="error" class="error">{{ error }}</p>
      </form>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f5f5f5;
      padding: 1rem;
    }
    .auth-nav {
      margin-bottom: 1rem;
      width: 100%;
      max-width: 400px;
      display: flex;
      justify-content: flex-end;
    }
    .nav-btn {
      padding: 0.5rem 1rem;
      background-color: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      text-decoration: none;
    }
    .nav-btn:hover {
      background-color: #218838;
    }
    .login-form {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    button {
      width: 100%;
      padding: 0.75rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }
    button:disabled {
      background-color: #ccc;
    }
    .error {
      color: #dc3545;
      margin-top: 0.5rem;
      font-size: 0.875rem;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.error = '';
      const { username, password } = this.loginForm.value;
      
      this.authService.login(username, password).subscribe({
        next: (user) => {
          if (user) {
            this.router.navigate([user.role === 'admin' ? '/admin' : '/dashboard']);
          } else {
            this.error = 'Invalid credentials';
          }
          this.loading = false;
        },
        error: () => {
          this.error = 'An error occurred';
          this.loading = false;
        }
      });
    }
  }
}