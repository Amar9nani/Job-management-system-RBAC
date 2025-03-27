import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="admin-container">
      <div class="header">
        <h2>Admin Dashboard</h2>
        <button (click)="logout()" class="logout-btn">Logout</button>
      </div>
      <div class="users-table">
        <h3>User Management</h3>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of users">
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
              <td>{{ user.createdAt | date }}</td>
              <td>
                <button 
                  (click)="deleteUser(user.id)" 
                  class="delete-btn"
                  [disabled]="user.role === 'admin'"
                  [title]="user.role === 'admin' ? 'Cannot delete admin users' : 'Delete user'">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .admin-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    .users-table {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      overflow-x: auto;
    }
    .users-table h3 {
      margin-bottom: 1rem;
      color: #333;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    th {
      background-color: #f8f9fa;
      font-weight: 600;
    }
    tr:hover {
      background-color: #f8f9fa;
    }
    .delete-btn {
      background-color: #dc3545;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
    }
    .delete-btn:hover:not(:disabled) {
      background-color: #c82333;
    }
    .delete-btn:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }
    .logout-btn {
      padding: 0.5rem 1rem;
      background-color: #dc3545;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .logout-btn:hover {
      background-color: #c82333;
    }
  `]
})
export class AdminComponent implements OnInit {
  users: User[] = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.authService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  deleteUser(id: string) {
    this.authService.deleteUser(id).subscribe(success => {
      if (success) {
        this.loadUsers();
      }
    });
  }

  logout() {
    this.router.navigate(['/login']);
  }
}