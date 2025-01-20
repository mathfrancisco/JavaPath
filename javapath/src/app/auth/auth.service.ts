import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
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

interface AuthResponse {
  access_token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;
  private tokenKey = 'javapath_token';
  public isLoggedOut$: Observable<boolean>;
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private router: Router, private http: HttpClient) {
    const storedUser = this.getUserFromStorage();
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoggedOut$ = this.currentUser$.pipe(map(user => !user));
  }

  private getUserFromStorage(): User | null {
    const storedUser = localStorage.getItem('currentUser');
    const storedToken = localStorage.getItem(this.tokenKey);
    
    if (!storedUser || !storedToken) return null;
    
    try {
      const user = JSON.parse(storedUser);
      if (user) {
        user.createdAt = new Date(user.createdAt);
        if (user.lastLogin) user.lastLogin = new Date(user.lastLogin);
      }
      return user;
    } catch (e) {
      console.error('Error parsing stored user:', e);
      this.logout();
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
      const response = await this.http.post<AuthResponse>(`${this.apiUrl}/login`, {
        username,
        password,
        role
      }).toPromise();

      if (response && response.access_token) {
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        localStorage.setItem(this.tokenKey, response.access_token);
        this.currentUserSubject.next(response.user);
        return true;
      }
      throw new Error('Login failed');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async register(registrationData: RegisterData): Promise<void> {
    try {
      await this.http.post(`${this.apiUrl}/register`, registrationData).toPromise();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
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
}
