import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  private apiUrl = 'https://api.exemplo.com/comentarios'; // Substitua pela URL da sua API

  constructor(private http: HttpClient) {}

  findAllByPost(postId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?postId=${postId}`);
  }

  create(comment: { conteudo: string; postId: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, comment);
  }

  moderate(id: string, approved: boolean): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, { moderado: approved });
  }

  remove(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
