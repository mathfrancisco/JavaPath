// curso-filtro.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { Course } from '../../../components/shared/types/course.types';

interface FilterValues {
  level: string;
  duration: string;
  rating: number;
  price: number;
  searchTerm: string;
  category: string;
}

@Component({
  selector: 'app-curso-filtro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatSliderModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  templateUrl: './curso-filtro.component.html',
  styleUrl: './curso-filtro.component.css'
})
export class CursoFiltroComponent {
  @Output() filteredCourses = new EventEmitter<Course[]>();
  filterForm: FormGroup;
  private currentSearchTerm = '';
  private currentCategory = '';
  private allCourses: Course[] = [];

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      level: [''],
      duration: [''],
      rating: [0],
      price: [0]
    });

    this.filterForm.valueChanges.subscribe(values => {
      this.applyFilters({
        ...values,
        searchTerm: this.currentSearchTerm,
        category: this.currentCategory
      });
    });
  }

  setCourses(courses: Course[]): void {
    this.allCourses = courses;
    this.applyFilters({
      ...this.filterForm.value,
      searchTerm: this.currentSearchTerm,
      category: this.currentCategory
    });
  }

  updateSearchTerm(searchTerm: string): void {
    this.currentSearchTerm = searchTerm;
    this.applyFilters({
      ...this.filterForm.value,
      searchTerm: this.currentSearchTerm,
      category: this.currentCategory
    });
  }

  updateCategory(category: string): void {
    this.currentCategory = category;
    this.applyFilters({
      ...this.filterForm.value,
      searchTerm: this.currentSearchTerm,
      category: this.currentCategory
    });
  }

  private parseDuration(duration: string): number {
    const hours = parseInt(duration);
    return isNaN(hours) ? 0 : hours;
  }

  private applyFilters(filters: FilterValues): void {
    let filteredResults = [...this.allCourses];

    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filteredResults = filteredResults.filter(course =>
        course.title.toLowerCase().includes(term) ||
        course.description.toLowerCase().includes(term)
      );
    }

    if (filters.category) {
      const category = filters.category.toLowerCase();
      filteredResults = filteredResults.filter(course =>
        course.categories.some((cat: string) => cat.toLowerCase() === category)
      );
    }

    if (filters.level) {
      filteredResults = filteredResults.filter(course =>
        course.level.toLowerCase() === filters.level.toLowerCase()
      );
    }

    if (filters.duration) {
      const maxDuration = this.parseDuration(filters.duration);
      if (maxDuration > 0) {
        filteredResults = filteredResults.filter(course => {
          const courseDuration = this.parseDuration(course.duration);
          return courseDuration <= maxDuration;
        });
      }
    }

    if (filters.rating > 0) {
      filteredResults = filteredResults.filter(course =>
        course.rating >= filters.rating
      );
    }

    if (filters.price > 0) {
      filteredResults = filteredResults.filter(course =>
        course.price <= filters.price
      );
    }

    this.filteredCourses.emit(filteredResults);
  }
}
