// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'student' | 'instructor';
  enrolledCourses?: number[];
  completedCourses?: number[];
  progress?: { [courseId: number]: number };
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Promise<boolean> {
    // Simulação de login - substitua por chamada real à API
    return new Promise((resolve) => {
      const mockUser: User = {
        id: '1',
        username,
        email: `${username}@example.com`,
        name: 'Nome do Usuário',
        avatar: '/assets/avatar-placeholder.png',
        role: 'student',
        enrolledCourses: [1, 2, 3],
        completedCourses: [1],
        progress: { 1: 100, 2: 45, 3: 10 },
        createdAt: new Date()
      };

      this.currentUserSubject.next(mockUser);
      localStorage.setItem('currentUser', JSON.stringify(mockUser));
      resolve(true);
    });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  updateUserProfile(updates: Partial<User>): Promise<User> {
    return new Promise((resolve, reject) => { // Add reject for error handling
      const currentUser = this.currentUserValue;

      if (!currentUser) {
        return reject("User not logged in."); // Reject if no user
      }

      const updatedUser: User = { ...currentUser, ...updates }; // Type assertion

      this.currentUserSubject.next(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      resolve(updatedUser);
    });}

  isAuthenticated() {
    return false;
  }

  isLoggedOut() {
    return undefined;
  }

}
