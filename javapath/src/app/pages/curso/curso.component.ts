// curso.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Course } from '../../components/shared/types/course.types';
import { CourseService } from '../../services/cursos.service';
import { CourseSearchComponent } from './curso-busca/curso-busca.component';
import { CursoFiltroComponent } from './curso-filtro/curso-filtro.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-curso',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CourseSearchComponent,
    CursoFiltroComponent,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './curso.component.html'
})
export class CursoComponent implements OnInit {
  @ViewChild(CursoFiltroComponent) filterComponent!: CursoFiltroComponent;

  cursos: Course[] = [];
  filteredCursos: Course[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.courseService.getCourses().subscribe({
      next: (courses: Course[]) => {
        this.cursos = courses;
        this.filteredCursos = courses;
        this.filterComponent.setCourses(courses);
        this.loading = false;
      },
      error: (error: Error) => {
        this.error = 'Error fetching courses';
        console.error('Error fetching courses:', error);
        this.loading = false;
      }
    });
  }

  onSearchChange(searchTerm: string): void {
    if (this.filterComponent) {
      this.filterComponent.updateSearchTerm(searchTerm);
    }
  }

  onCategoryChange(category: string): void {
    if (category) {
      this.router.navigate(['/cursos/categoria', category]);
    } else if (this.filterComponent) {
      this.filterComponent.updateCategory('');
    }
  }

  onFilteredCoursesChange(courses: Course[]): void {
    this.filteredCursos = courses;
  }
}
