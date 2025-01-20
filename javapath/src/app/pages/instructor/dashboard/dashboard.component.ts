import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { InstructorService, InstructorStats, CursoInstructor } from '../../../services/instructor.service';
import { InstructorService } from '../../services/instructor.service';
import { InstructorStats, Curso } from '../../models/instructor.models';
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
export class DashboardComponent implements OnInit {
  stats: InstructorStats | null = null;
  cursos: Curso[] = [];

  constructor(private instructorService: InstructorService) {}

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.instructorService.getStats().subscribe(stats => this.stats = stats);
    this.instructorService.getCursos().subscribe(cursos => this.cursos = cursos);
  }
}
