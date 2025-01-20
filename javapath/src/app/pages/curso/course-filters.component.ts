import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-course-filters',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatSliderModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  template: `
    <form [formGroup]="filterForm" class="p-4">
      <mat-expansion-panel>
        <mat-expansion-panel-header>
          <mat-panel-title>Filtros Avançados</mat-panel-title>
        </mat-expansion-panel-header>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Nível -->
          <mat-radio-group formControlName="level">
            <h4>Nível</h4>
            <mat-radio-button value="beginner">Iniciante</mat-radio-button>
            <mat-radio-button value="intermediate">Intermediário</mat-radio-button>
            <mat-radio-button value="advanced">Avançado</mat-radio-button>
          </mat-radio-group>

          <!-- Duração -->
          <div>
            <h4>Duração</h4>
            <mat-slider min="0" max="50" step="1" formControlName="duration">
              <input matSliderThumb>
            </mat-slider>
            <span>{{filterForm.get('duration')?.value}} horas</span>
          </div>

          <!-- Avaliação -->
          <div>
            <h4>Avaliação Mínima</h4>
            <mat-slider min="1" max="5" step="0.5" formControlName="rating">
              <input matSliderThumb>
            </mat-slider>
          </div>

          <!-- Preço -->
          <div>
            <h4>Faixa de Preço</h4>
            <mat-slider min="0" max="1000" step="50" formControlName="price">
              <input matSliderThumb>
            </mat-slider>
          </div>
        </div>
      </mat-expansion-panel>
    </form>
  `
})
export class CourseFiltersComponent {
  @Output() filtersChanged = new EventEmitter<any>();
  filterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      level: [''],
      duration: [0],
      rating: [0],
      price: [0]
    });

    this.filterForm.valueChanges.subscribe(values => {
      this.filtersChanged.emit(values);
    });
  }
}

// 2. Service para Gerenciamento de Estado dos Cursos
// course-state.service.ts
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
