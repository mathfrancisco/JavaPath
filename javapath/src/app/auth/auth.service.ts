// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

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

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private tokenKey = 'javapath_token';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private getUserFromStorage(): User | null {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public get token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  async login(username: string, password: string, role: string): Promise<boolean> {
    try {
      // Em produção, substitua por uma chamada real à API
      // const response = await this.http.post<{user: User, token: string}>
      //   (`${environment.apiUrl}/auth/login`, { username, password, role }).toPromise();

      // Simulação de resposta
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

      // Armazenar dados
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
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue && !!this.token;
  }

  isInRole(role: string): boolean {
    return this.currentUserValue?.role === role;
  }

  async updateUserProfile(updates: Partial<User>): Promise<User> {
    try {
      // Em produção, substitua por uma chamada real à API
      // const updatedUser = await this.http.patch<User>
      //   (`${environment.apiUrl}/users/profile`, updates).toPromise();

      const currentUser = this.currentUserValue;
      if (!currentUser) {
        throw new Error("User not logged in.");
      }

      const updatedUser: User = { ...currentUser, ...updates };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      this.currentUserSubject.next(updatedUser);

      return updatedUser;
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  }

  refreshToken(): Promise<string> {
    // Implementar lógica de refresh token
    return Promise.resolve('new_token');
  }
}