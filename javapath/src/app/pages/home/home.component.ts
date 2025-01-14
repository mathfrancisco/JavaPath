import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { CardCursoComponent, Curso } from '../../components/card-curso/card-curso.component';
import { CarrosselComponent } from '../../components/carrossel/carrossel.component';
import {CommonModule, NgForOf} from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import {CardBlogComponent} from '../../components/card-blog/card-blog.component';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    CardBlogComponent,
    NgForOf,
    CardCursoComponent,
    CarrosselComponent, MatTabsModule, CommonModule, HeroComponent, MatButton, MatIcon
  ],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  trilhas = [
    {
      icon: 'school',
      title: 'Iniciante em Java',
      description: 'Aprenda os fundamentos da linguagem Java e programação orientada a objetos.'
    },
    {
      icon: 'code',
      title: 'Desenvolvimento Web',
      description: 'Domine o desenvolvimento web com Spring Boot e tecnologias modernas.'
    },
    {
      icon: 'cloud',
      title: 'Arquitetura Cloud',
      description: 'Construa aplicações escaláveis com práticas de cloud computing.'
    }
  ];

  cursosPopulares: Curso[] = [
    {
      id: 1,
      title: 'Java Fundamentos',
      imageUrl: '/assets/courses/java-fundamentals.jpg',
      author: 'João Silva',
      description: 'Aprenda Java do zero com exercícios práticos',
      level: 'Iniciante',
      duration: '12h',
      rating: 4.8
    },
    // ... mais cursos
  ];

  cursosRecentes: Curso[] = [
    // ... cursos recentes
  ];}



