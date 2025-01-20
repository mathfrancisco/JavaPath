// curso-detalhe.component.ts

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {MatInput} from '@angular/material/input';
import {Course} from '../../components/shared/types/course.types';
import {CourseService} from '../../services/cursos.service';


@Component({
  selector: 'app-curso-detalhe',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatAccordion,
    MatExpansionPanel,
    MatTab,
    MatInput,
    MatTabGroup
  ],
  templateUrl: './curso-detalhe.component.html',
  styleUrls: ['./curso-detalhe.component.css']
})
export class CursoDetalheComponent implements OnInit {
  courses: Course[] = [];
  loading = false;
  error?: string;

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses(search?: string, categoryId?: string) {
    this.loading = true;
    this.courseService.getCourses(search, categoryId)
      .subscribe({
        next: (courses) => {
          this.courses = courses;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Error loading courses';
          this.loading = false;
          console.error('Error loading courses:', error);
        }
      });
  }

  onSearch(search: string) {
    this.loadCourses(search);
  }

  onCategoryChange(categoryId: string) {
    this.loadCourses(undefined, categoryId);
  }
}
