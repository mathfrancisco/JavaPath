import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import {BaseChartDirective} from 'ng2-charts';
import { InstructorService } from '../../../services/instructor.service';
import { Course, InstructorStats } from '../../../components/shared/types/course.types';

@Component({
  selector: 'app-instructor-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    BaseChartDirective
  ],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  stats: InstructorStats | null = null;
  cursos: Course[] = [];

  // Chart configurations
  engagementChartData: any[] = [];
  engagementChartLabels: string[] = [];
  revenueChartData: any[] = [];
  revenueChartLabels: string[] = [];
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(private instructorService: InstructorService) {}

  ngOnInit() {
    this.loadData();
    this.setupCharts();
  }

  private loadData() {
    this.instructorService.getStats().subscribe({
      next: (stats) => {
        this.stats = stats;
      },
      error: (error) => {
        console.error('Erro ao carregar estatísticas:', error);
      }
    });

    this.instructorService.getCursos().subscribe({
      next: (cursos) => {
        this.cursos = cursos;
        this.updateChartData();
      },
      error: (error) => {
        console.error('Erro ao carregar cursos:', error);
      }
    });
  }

  private setupCharts() {
    // Configuração inicial dos gráficos
    this.engagementChartData = [{
      data: [],
      label: 'Alunos Ativos'
    }];

    this.revenueChartData = [{
      data: [],
      label: 'Receita Mensal',
      borderColor: '#4CAF50'
    }];
  }

  private updateChartData() {
    // Atualiza dados dos gráficos baseado nos cursos
    const engagementData = this.cursos.map(curso => curso.totalStudents);
    const labels = this.cursos.map(curso => curso.title);

    this.engagementChartData[0].data = engagementData;
    this.engagementChartLabels = labels;
  }
}
