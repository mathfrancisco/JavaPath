import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../shared/types/course.types';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = '/api/courses';

  constructor(private http: HttpClient) {}

  getCourses(
    search?: string,
    categoryId?: string,
    instructorId?: string,
    status: string = 'published'
  ): Observable<Course[]> {
    let params = new HttpParams().set('status', status);
    
    if (search) params = params.set('search', search);
    if (categoryId) params = params.set('categoryId', categoryId);
    if (instructorId) params = params.set('instructorId', instructorId);

    return this.http.get<Course[]>(this.apiUrl, { params });
  }

  getCourseById(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }
}
