import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="register-container">
      <div class="auth-nav">
        <button [routerLink]="['/login']" class="nav-btn">Login</button>
      </div>
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="register-form">
        <h2>Register</h2>
        <div class="form-group">
          <input type="text" formControlName="username" placeholder="Username" />
          <div *ngIf="registerForm.get('username')?.touched && registerForm.get('username')?.invalid" class="error">
            Username is required
          </div>
        </div>
        <div class="form-group">
          <input type="email" formControlName="email" placeholder="Email" />
          <div *ngIf="registerForm.get('email')?.touched && registerForm.get('email')?.invalid" class="error">
            Valid email is required
          </div>
        </div>
        <div class="form-group">
          <input type="password" formControlName="password" placeholder="Password" />
          <div *ngIf="registerForm.get('password')?.touched && registerForm.get('password')?.invalid" class="error">
            Password is required
          </div>
        </div>
        <div class="form-group">
          <select formControlName="role">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" [disabled]="loading || !registerForm.valid">
          {{ loading ? 'Loading...' : 'Register' }}
        </button>
        <p *ngIf="error" class="error">{{ error }}</p>
      </form>
    </div>
  `,
  styles: [`
    .register-container {
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
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      text-decoration: none;
    }
    .nav-btn:hover {
      background-color: #0056b3;
    }
    .register-form {
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
    input, select {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    button {
      width: 100%;
      padding: 0.75rem;
      background-color: #28a745;
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
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['user', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.loading = true;
      this.error = '';
      
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.router.navigate(['/login']);
          this.loading = false;
        },
        error: () => {
          this.error = 'Registration failed';
          this.loading = false;
        }
      });
    }
  }
}