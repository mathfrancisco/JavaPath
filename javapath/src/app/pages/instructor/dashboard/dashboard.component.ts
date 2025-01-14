import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { InstructorService, InstructorStats, CursoInstructor } from '../../../services/instructor.service';

@Component({
  selector: 'app-instructor-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './dashboard.component.html'
})
export class InstructorDashboardComponent implements OnInit {
  stats: InstructorStats | null = null;
  cursos: CursoInstructor[] = []; // Initialize as an empty array
  isLoading = true;
  error = '';

  constructor(private instructorService: InstructorService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  private loadDashboardData() {
    this.isLoading = true;
    Promise.all([
      this.instructorService.getStats().toPromise(),
      this.instructorService.getCursos().toPromise()
    ]).then(([stats, cursos]) => {
      this.stats = stats!;
      this.cursos = cursos!;
      this.isLoading = false;
    }).catch(error => {
      this.error = 'Erro ao carregar dados do dashboard';
      this.isLoading = false;
    });}
}
