// curso-detalhe.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommentComponent } from '../../components/comments/comments.component';

interface Curso {
  id: number;
  title: string;
  instructor: string;
  description: string;
  imageUrl: string;
  rating: number;
  totalStudents: number;
  duration: string;
  level: string;
  lastUpdate: Date;
  price: number;
  modules: CourseModule[];
}

interface CourseModule {
  id: number;
  title: string;
  duration: string;
  lessons: Lesson[];
}

interface Lesson {
  id: number;
  title: string;
  duration: string;
  isCompleted: boolean;
}

@Component({
  selector: 'app-curso-detalhe',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    CommentComponent
  ],
  templateUrl: './curso-detalhe.component.html',
  styleUrls: ['./curso-detalhe.component.css']
})
export class CursoDetalheComponent implements OnInit {
  curso: Curso = {
    id: 1,
    title: 'Java Completo 2024 - Do Zero ao Profissional',
    instructor: 'João Silva',
    description: 'Aprenda Java do zero com exercícios práticos e projetos reais.',
    imageUrl: '/assets/courses/java-course.jpg',
    rating: 4.8,
    totalStudents: 15000,
    duration: '40h',
    level: 'Intermediário',
    lastUpdate: new Date('2024-01-10'),
    price: 199.90,
    modules: [
      {
        id: 1,
        title: 'Introdução ao Java',
        duration: '2h',
        lessons: [
          { id: 1, title: 'Configurando o Ambiente', duration: '15min', isCompleted: true },
          { id: 2, title: 'Primeiro Programa', duration: '20min', isCompleted: false }
        ]
      },
      // Adicione mais módulos conforme necessário
    ]
  };

  progress: number = 35;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      // Aqui você buscaria os dados do curso baseado no ID
      console.log('Curso ID:', params['id']);
    });
  }

  calcularProgresso(): number {
    let totalLessons = 0;
    let completedLessons = 0;

    this.curso.modules.forEach(module => {
      totalLessons += module.lessons.length;
      completedLessons += module.lessons.filter(lesson => lesson.isCompleted).length;
    });

    return (completedLessons / totalLessons) * 100;
  }
}
