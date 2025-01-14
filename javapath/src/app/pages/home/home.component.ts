import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { CardCursoComponent, Curso } from '../../components/card-curso/card-curso.component';
import {CarouselItem, CarrosselComponent} from '../../components/carrossel/carrossel.component';
import {CommonModule, NgForOf} from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import {MatAnchor, MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    NgForOf,
    CardCursoComponent,
    CarrosselComponent, MatTabsModule, CommonModule, HeroComponent, MatButton, MatIcon, NavbarComponent, FooterComponent, RouterLink, MatAnchor
  ],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  blogPosts: any[] = [];  // Initialize as empty array
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
    // ... mais cursos
  ];

  cursosRecentes: Curso[] = [
    // ... cursos recentes
  ];


}



