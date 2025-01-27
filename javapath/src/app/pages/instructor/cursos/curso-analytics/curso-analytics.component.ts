import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CursoAnalytics } from '../../../../components/shared/types/course.types';
import { InstructorService } from '../../../../services/instructor.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-curso-analytics',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    BaseChartDirective
  ],
  templateUrl: './curso-analytics.component.html',
  styleUrls: ['./curso-analytics.component.css']
})
export class CursoAnalyticsComponent implements OnInit {
  analytics: CursoAnalytics = {
    visualizacoes: 0,
    crescimentoVisualizacoes: 0,
    alunosAtivos: 0,
    crescimentoAlunos: 0,
    avaliacaoMedia: 0,
    totalAvaliacoes: 0,
    taxaConclusao: 0,
    alunosConcluintes: 0,
    engajamentoPorAula: [],
    progressoAlunos: [],
    receitaMensal: []
  };
  filterForm: FormGroup;

  // Configurações dos gráficos
  chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  // Dados dos gráficos
  engagementChartData: any[] = [];
  engagementChartLabels: string[] = [];

  progressChartData: any[] = [];
  progressChartLabels: string[] = [];

  revenueChartData: any[] = [];
  revenueChartLabels: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private instructorService: InstructorService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      startDate: [new Date(new Date().setMonth(new Date().getMonth() - 1))],
      endDate: [new Date()]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.loadAnalytics(params['id']);
      }
    });
  }

  private loadAnalytics(cursoId: number) {
    this.instructorService.getDetailedAnalytics(cursoId).subscribe({
      next: (data) => {
        this.analytics = data;
        this.updateCharts(data);
      },
      error: (error) => console.error('Erro ao carregar analytics:', error)
    });
  }

  private updateCharts(data: CursoAnalytics) {
    // Atualiza gráfico de engajamento
    this.engagementChartData = [{
      data: data.engajamentoPorAula.map(aula => aula.visualizacoes),
      label: 'Visualizações por Aula'
    }];
    this.engagementChartLabels = data.engajamentoPorAula.map(aula => aula.titulo);

    // Atualiza gráfico de progresso
    this.progressChartData = [{
      data: data.progressoAlunos?.map(p => p.percentual) || [],
      label: 'Progresso dos Alunos'
    }];
    this.progressChartLabels = data.progressoAlunos?.map(p => p.data) || [];

    // Atualiza gráfico de receita
    this.revenueChartData = [{
      data: data.receitaMensal?.map(r => r.valor) || [],
      label: 'Receita Mensal'
    }];
    this.revenueChartLabels = data.receitaMensal?.map(r => r.mes) || [];
  }

  applyFilters() {
    if (this.filterForm.valid) {
      const cursoId = this.route.snapshot.params['id'];
      const filters = this.filterForm.value;

      this.instructorService.getDetailedAnalytics(cursoId, filters).subscribe({
        next: (data) => {
          this.analytics = data;
          this.updateCharts(data);
        },
        error: (error) => console.error('Erro ao aplicar filtros:', error)
      });
    }
  }

  exportReport() {
    const cursoId = this.route.snapshot.params['id'];
    this.instructorService.exportAnalyticsReport(cursoId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `relatorio-curso-${cursoId}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => console.error('Erro ao exportar relatório:', error)
    });
  }
}
