import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Course } from '../types/course.types';

@Injectable({
  providedIn: 'root'
})
export class CourseSearchService {
  private searchQuerySubject = new Subject<string>();
  private recentSearchesSubject = new BehaviorSubject<string[]>([]);
  
  constructor(private http: HttpClient) {
    // Recupera buscas recentes do localStorage
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      this.recentSearchesSubject.next(JSON.parse(savedSearches));
    }
  }

  // Observable para buscas com debounce
  searchResults$ = this.searchQuerySubject.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(term => this.searchCourses(term))
  );

  // Método para realizar a busca
  searchCourses(term: string): Observable<Course[]> {
    return this.http.get<Course[]>(`/api/courses/search?q=${term}`);
  }

  // Método para adicionar nova busca
  search(term: string) {
    this.searchQuerySubject.next(term);
    this.addToRecentSearches(term);
  }

  // Gerenciamento de buscas recentes
  private addToRecentSearches(term: string) {
    const recent = this.recentSearchesSubject.value;
    const updated = [term, ...recent.filter(t => t !== term)].slice(0, 5);
    this.recentSearchesSubject.next(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  }

  getRecentSearches(): Observable<string[]> {
    return this.recentSearchesSubject.asObservable();
  }
}
