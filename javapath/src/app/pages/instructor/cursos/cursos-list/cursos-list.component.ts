// pages/instructor/cursos/cursos-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { InstructorService } from '../../../../services/instructor.service';
import {Course, CourseModule} from '../../../../components/shared/types/course.types';

@Component({
  selector: 'app-cursos-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule
  ],
  templateUrl: './cursos-list.component.html'
})
export class CursosListComponent implements OnInit {
  displayedColumns: string[] = ['titulo', 'alunosMatriculados', 'avaliacaoMedia', 'status', 'ultimaAtualizacao', 'acoes'];
  cursos: {
    id: number;
    title: string;
    description: string;
    instructor: string;
    imageUrl: string;
    price: number;
    duration: string;
    level: string;
    rating: number;
    totalStudents: number;
    categories: string[];
    status: "draft" | "published" | "archived";
    modules: CourseModule[];
    lastUpdate: Date
  }[] = [];
  isLoading = true;

  constructor(private instructorService: InstructorService) {}

  ngOnInit() {
    this.loadCursos();
  }

  loadCursos() {
    this.isLoading = true;
    this.instructorService.getCursos().subscribe({
      next: (cursos: Course[]) => {
        this.cursos = cursos.map(course => ({
          ...course,
          id: Number(course.id)
        }));
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar cursos:', error);
        this.isLoading = false;
      }
    });
  }

  deleteCurso(id: number) {
    if (confirm('Tem certeza que deseja excluir este curso?')) {
      this.instructorService.deleteCurso(id).subscribe({
        next: () => {
          this.cursos = this.cursos.filter(curso => curso.id !== id);
        },
        error: (error) => {
          console.error('Erro ao excluir curso:', error);
        }
      });
    }
  }
}
