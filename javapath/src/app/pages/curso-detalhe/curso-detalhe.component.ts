// curso-detalhe.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {MatInput} from '@angular/material/input';

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
  description: string;
  duration: string;
  isCompleted: boolean;
  materials?: Material[];
  exercises?: Exercise[];
  comments?: Comment[];
}

interface Material {
  title: string;
  type: 'pdf' | 'exercise';
  url: string;
}

interface Exercise {
  title: string;
  description: string;
}

interface Comment {
  userName: string;
  userAvatar: string;
  content: string;
  date: Date;
}

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
  currentLesson: Lesson | undefined; // Add currentLesson
  progress = 0; // Initialize progress
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
          {
            id: 1, title: 'Configurando o Ambiente', duration: '15min', isCompleted: true,
            description: ''
          },
          {
            id: 2, title: 'Primeiro Programa', duration: '20min', isCompleted: false,
            description: ''
          }
        ]
      },
      // Adicione mais módulos conforme necessário
    ]
  };


  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const cursoId = +params['id'];  // Convert id to number
      // Fetch the course data.  Replace this with your actual data fetching logic.
      this.curso = this.getCursoById(cursoId) ?? this.curso; // Keep existing data if not found


      this.currentLesson = this.curso.modules[0]?.lessons[0]; // Initialize currentLesson


      this.progress = this.calcularProgresso(); // Calculate progress in ngOnInit

    });}

  calcularProgresso(): number {
    let totalLessons = 0;
    let completedLessons = 0;

    this.curso.modules.forEach(module => {
      totalLessons += module.lessons.length;
      completedLessons += module.lessons.filter(lesson => lesson.isCompleted).length;
    });

    return (completedLessons / totalLessons) * 100;
  }
  getCursoById(id:number) : Curso | undefined {
    // Your code to fetch curso by Id and return it
    return undefined;
  }

  selectLesson(lesson: Lesson) {
    this.currentLesson = lesson;
    this.progress = this.calcularProgresso();

  }
}
