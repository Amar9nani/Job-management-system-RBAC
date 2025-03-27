import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'users_data';
  private users: User[] = [];

  constructor() {
    this.loadUsersFromStorage();
    if (this.users.length === 0) {
      // Add default admin if no users exist
      this.users = [{
        id: '1',
        username: 'admin',
        password: 'admin123',
        role: 'admin',
        email: 'admin@example.com',
        createdAt: new Date()
      }];
      this.saveUsersToStorage();
    }
  }

  private loadUsersFromStorage(): void {
    const storedData = localStorage.getItem(this.STORAGE_KEY);
    if (storedData) {
      try {
        const xmlDoc = new DOMParser().parseFromString(storedData, 'text/xml');
        const userNodes = xmlDoc.getElementsByTagName('user');
        this.users = Array.from(userNodes).map(node => ({
          id: node.getAttribute('id') || '',
          username: node.getAttribute('username') || '',
          password: node.getAttribute('password') || '',
          email: node.getAttribute('email') || '',
          role: node.getAttribute('role') as 'user' | 'admin',
          createdAt: new Date(node.getAttribute('createdAt') || '')
        }));
      } catch (error) {
        console.error('Error parsing XML:', error);
        this.users = [];
      }
    }
  }

  private saveUsersToStorage(): void {
    const xmlDoc = document.implementation.createDocument(null, 'users', null);
    this.users.forEach(user => {
      const userElement = xmlDoc.createElement('user');
      userElement.setAttribute('id', user.id);
      userElement.setAttribute('username', user.username);
      userElement.setAttribute('password', user.password);
      userElement.setAttribute('email', user.email);
      userElement.setAttribute('role', user.role);
      userElement.setAttribute('createdAt', user.createdAt.toISOString());
      xmlDoc.documentElement.appendChild(userElement);
    });
    const serializer = new XMLSerializer();
    const xmlString = serializer.serializeToString(xmlDoc);
    localStorage.setItem(this.STORAGE_KEY, xmlString);
  }

  login(username: string, password: string): Observable<User | null> {
    const user = this.users.find(u => u.username === username && u.password === password);
    return of(user || null).pipe(delay(1000));
  }

  register(user: Omit<User, 'id' | 'createdAt'>): Observable<User> {
    const newUser: User = {
      ...user,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    this.users.push(newUser);
    this.saveUsersToStorage();
    return of(newUser).pipe(delay(1000));
  }

  getAllUsers(): Observable<User[]> {
    return of(this.users).pipe(delay(1000));
  }

  deleteUser(id: string): Observable<boolean> {
    const index = this.users.findIndex(u => u.id === id);
    if (index > -1) {
      this.users.splice(index, 1);
      this.saveUsersToStorage();
      return of(true).pipe(delay(1000));
    }
    return of(false).pipe(delay(1000));
  }
}