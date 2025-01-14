import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { CardCursoComponent, Curso } from '../../components/card-curso/card-curso.component';

import {CommonModule, NgForOf} from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import {MatAnchor, MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {RouterLink} from '@angular/router';
import {CardBlogComponent} from '../../components/card-blog/card-blog.component';
interface BlogPost {
  id: number;
  title: string;
  imageUrl: string;
  date: Date;
  author: string;
  excerpt: string;
  authorAvatar: string;
  readTime: number;
  category: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    NgForOf,
    CardCursoComponent,
     MatTabsModule, CommonModule, HeroComponent, MatIcon, NavbarComponent, FooterComponent, RouterLink, MatAnchor, CardBlogComponent
  ],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    // Initialize as empty array
  cursos: any[] = [];
  trilhas = [
    {
      icon: 'school',
      title: 'Iniciante em Java',
      imageUrl: '/assets/courses/java-basics.jpg',
      link: '/curso-java-fundamentos',
      description: 'Aprenda os fundamentos da linguagem Java e programação orientada a objetos.'
    },
    {
      icon: 'code',
      title: 'Desenvolvimento Web',
      imageUrl: '/assets/courses/java-basics.jpg',
      link: '/curso-java-fundamentos',
      description: 'Domine o desenvolvimento web com Spring Boot e tecnologias modernas.'
    },
    {
      icon: 'cloud',
      title: 'Arquitetura Cloud',
      link: '/curso-java-fundamentos',
      imageUrl: '/assets/courses/java-basics.jpg',
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
    {
      id: 2,
      title: 'Spring Boot Essencial',
      imageUrl: '/assets/courses/spring-boot-essential.jpg',
      author: 'Maria Souza',
      description: 'Crie APIs RESTful com Spring Boot',
      level: 'Intermediário',
      duration: '8h',
      rating: 4.5
    },
    {
      id: 3,
      title: 'Microsserviços com Spring Cloud',
      imageUrl: '/assets/courses/microservices.jpg',
      author: 'Pedro Santos',
      description: 'Arquitetura de microsserviços com Spring Cloud',
      level: 'Avançado',
      duration: '16h',
      rating: 4.7
    },
    // ... more popular courses
  ];

  cursosRecentes: Curso[] = [
    {
      id: 4,
      title: 'Angular para Iniciantes',
      imageUrl: '/assets/courses/angular.jpg',
      author: 'Ana Oliveira',
      description: 'Desenvolvimento web com Angular',
      level: 'Iniciante',
      duration: '10h',
      rating: 4.6
    },
    {
      id: 5,
      title: 'React - O guia completo',
      imageUrl: '/assets/courses/react.jpg',
      author: 'Paulo Fernandes',
      description: 'Aprenda React com projetos práticos',
      level: 'Intermediário',
      duration: '14h',
      rating: 4.9
    },
    // ... more recent courses
  ];
  blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Introdução ao Java',
      imageUrl: '/assets/images/blog/java-intro.jpg',
      date: new Date('2023-10-01'),
      author: 'Carlos Silva',
      excerpt: 'Descubra os conceitos básicos de Java e como começar a programar.',
      authorAvatar: '/assets/images/authors/carlos.jpg',
      readTime: 5,
      category: 'Java'
    },
    {
      id: 2,
      title: 'Spring Boot para Iniciantes',
      imageUrl: '/assets/images/blog/spring-boot.jpg',
      date: new Date('2023-09-15'),
      author: 'Mariana Costa',
      excerpt: 'Aprenda a criar aplicações web com Spring Boot de forma simples e prática.',
      authorAvatar: '/assets/images/authors/mariana.jpg',
      readTime: 7,
      category: 'Spring Boot'
    },
    {
      id: 3,
      title: 'Desenvolvimento Web com Angular',
      imageUrl: '/assets/images/blog/angular-web.jpg',
      date: new Date('2023-09-10'),
      author: 'Lucas Pereira',
      excerpt: 'Explore o desenvolvimento de aplicações web modernas com Angular.',
      authorAvatar: '/assets/images/authors/lucas.jpg',
      readTime: 6,
      category: 'Angular'
    },
    // ... mais posts de blog
  ];


}



