import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './enviroments/environment.ts';
import { InstructorStats, Curso, CursoAnalytics } from '../models/instructor.models';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  private apiUrl = `${environment.apiUrl}/instructor`;

  constructor(private http: HttpClient) {}

  getStats(): Observable<InstructorStats> {
    return this.http.get<InstructorStats>(`${this.apiUrl}/stats`);
  }

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.apiUrl}/cursos`);
  }

  getCursoById(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.apiUrl}/cursos/${id}`);
  }

  createCurso(curso: Partial<Curso>): Observable<Curso> {
    return this.http.post<Curso>(`${this.apiUrl}/cursos`, curso);
  }

  updateCurso(id: number, curso: Partial<Curso>): Observable<Curso> {
    return this.http.put<Curso>(`${this.apiUrl}/cursos/${id}`, curso);
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
}
