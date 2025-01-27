import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/environment';
import { InstructorStats, Course, CursoAnalytics } from '../components/shared/types/course.types';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  private apiUrl = `${environment.apiUrl}/instructor`;

  constructor(private http: HttpClient) {}

  getStats(): Observable<InstructorStats> {
    return this.http.get<InstructorStats>(`${this.apiUrl}/stats`);
  }

  getCursos(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/cursos`);
  }

  getCursoById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/cursos/${id}`);
  }

  createCurso(curso: Partial<Course>): Observable<Course> {
    return this.http.post<Course>(`${this.apiUrl}/cursos`, curso);
  }

  updateCurso(id: number, curso: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/cursos/${id}`, curso);
  }

  deleteCurso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cursos/${id}`);
  }

  getCursoAnalytics(id: number): Observable<CursoAnalytics> {
    return this.http.get<CursoAnalytics>(`${this.apiUrl}/cursos/${id}/analytics`);
  }

  uploadMaterial(cursoId: number, file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ url: string }>(`${this.apiUrl}/cursos/${cursoId}/materiais`, formData);
  }
  getDetailedAnalytics(cursoId: number, filters?: any): Observable<CursoAnalytics> {
    let params = new HttpParams();
    if (filters) {
      Object.keys(filters).forEach(key => {
        params = params.set(key, filters[key]);
      });
    }
    return this.http.get<CursoAnalytics>(`/api/cursos/${cursoId}/analytics`, { params });
  }

  getEngagementByLesson(cursoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cursos/${cursoId}/lesson-engagement`);
  }

  getStudentProgress(cursoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cursos/${cursoId}/student-progress`);
  }

  getRevenueAnalytics(cursoId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cursos/${cursoId}/revenue-analytics`);
  }

  exportAnalyticsReport(cursoId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/cursos/${cursoId}/export-analytics`, {
      responseType: 'blob'
    });
  }
}
