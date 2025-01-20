import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Course } from '../types/course.types';

@Injectable({
  providedIn: 'root'
})
export class CourseStateService {
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  private filtersSubject = new BehaviorSubject<any>({});
  
  courses$ = this.coursesSubject.asObservable();
  filters$ = this.filtersSubject.asObservable();

  updateCourses(courses: Course[]) {
    this.coursesSubject.next(courses);
  }

  updateFilters(filters: any) {
    this.filtersSubject.next(filters);
  }

  getFilteredCourses() {
    const courses = this.coursesSubject.value;
    const filters = this.filtersSubject.value;

    return courses.filter(course => {
      if (filters.level && course.level !== filters.level) return false;
      if (filters.rating && course.rating < filters.rating) return false;
      if (filters.price && course.price > filters.price) return false;
      if (filters.duration && parseInt(course.duration) > filters.duration) return false;
      return true;
    });
  }
}
