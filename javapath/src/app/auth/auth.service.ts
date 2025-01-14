import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../enviroments/environment';

export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'student' | 'instructor' | 'admin';
  enrolledCourses?: number[];
  completedCourses?: number[];
  progress?: { [courseId: number]: number };
  createdAt: Date;
  lastLogin?: Date;
}

export interface RegisterData {
  role: 'student' | 'instructor';
  fullName: string;
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;
  private tokenKey = 'javapath_token';
  public isLoggedOut$: Observable<boolean>;

  constructor(private router: Router, private http: HttpClient) {
    // Initialize with stored user
    const storedUser = this.getUserFromStorage();
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoggedOut$ = this.currentUser$.pipe(map(user => !user));
  }

  private getUserFromStorage(): User | null {
    const storedUser = localStorage.getItem('currentUser');
    if (!storedUser) return null;

    try {
      const user = JSON.parse(storedUser);
      // Ensure dates are properly parsed
      if (user) {
        user.createdAt = new Date(user.createdAt);
        if (user.lastLogin) user.lastLogin = new Date(user.lastLogin);
      }
      return user;
    } catch (e) {
      console.error('Error parsing stored user:', e);
      localStorage.removeItem('currentUser');
      return null;
    }
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public get token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  async login(username: string, password: string, role: string): Promise<boolean> {
    try {
      const mockUser: User = {
        id: crypto.randomUUID(),
        username,
        email: `${username}@example.com`,
        name: 'Nome do Usuário',
        avatar: '/assets/avatar-placeholder.png',
        role: role as 'student' | 'instructor' | 'admin',
        enrolledCourses: role === 'student' ? [1, 2, 3] : undefined,
        completedCourses: role === 'student' ? [1] : undefined,
        progress: role === 'student' ? { 1: 100, 2: 45, 3: 10 } : undefined,
        createdAt: new Date(),
        lastLogin: new Date()
      };

      const mockToken = 'mock_jwt_token_' + Math.random();

      localStorage.setItem('currentUser', JSON.stringify(mockUser));
      localStorage.setItem(this.tokenKey, mockToken);
      this.currentUserSubject.next(mockUser);

      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']); // Fixed the route
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue && !!this.token;
  }

  isLoggedOut(): boolean {
    return !this.currentUserValue;
  }

  isInRole(role: string): boolean {
    return this.currentUserValue?.role === role;
  }

  async register(registrationData: Omit<any, "acceptTerms" | "confirmPassword">) {


  }
}
