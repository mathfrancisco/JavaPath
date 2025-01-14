// services/instructor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';

export interface InstructorStats {
  totalAlunos: number;
  totalCursos: number;
  avaliacaoMedia: number;
  receitaTotal: number;
  alunosAtivos: number;
  visualizacoesTotais: number;
}

export interface CursoInstructor {
  id: number;
  titulo: string;
  descricao: string;
  thumbnail: string;
  alunosMatriculados: number;
  avaliacaoMedia: number;
  totalAulas: number;
  preco: number;
  status: 'rascunho' | 'publicado' | 'revisao';
  ultimaAtualizacao: Date;
  estatisticas: {
    visualizacoes: number;
    concluidos: number;
    receita: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  private apiUrl = `${environment.apiUrl}/instructor`;

  constructor(private http: HttpClient) {}

  getStats(): Observable<InstructorStats> {
    return this.http.get<InstructorStats>(`${this.apiUrl}/stats`);
  }

  getCursos(): Observable<CursoInstructor[]> {
    return this.http.get<CursoInstructor[]>(`${this.apiUrl}/cursos`);
  }

  getCursoById(id: number): Observable<CursoInstructor> {
    return this.http.get<CursoInstructor>(`${this.apiUrl}/cursos/${id}`);
  }

  createCurso(curso: Partial<CursoInstructor>): Observable<CursoInstructor> {
    return this.http.post<CursoInstructor>(`${this.apiUrl}/cursos`, curso);
  }

  updateCurso(id: number, curso: Partial<CursoInstructor>): Observable<CursoInstructor> {
    return this.http.put<CursoInstructor>(`${this.apiUrl}/cursos/${id}`, curso);
  }

  deleteCurso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cursos/${id}`);
  }
}