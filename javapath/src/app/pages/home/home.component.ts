import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { CardCursoComponent } from '../../components/card-curso/card-curso.component';

import { CommonModule, NgForOf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { FooterComponent } from '../../components/footer/footer.component';
import { RouterLink } from '@angular/router';
import { CardBlogComponent } from '../../components/card-blog/card-blog.component';
import { AuthService } from '../../auth/auth.service';
import { Course } from '../../components/shared/types/course.types';
import { BaseChartDirective } from 'ng2-charts';

import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from '@angular/material/card';
import {NavbarComponent} from '../../components/navbar/navbar.component';

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

    CommonModule,
    HeroComponent,
    MatIconModule,
    MatCardModule,
    FooterComponent,
    RouterLink,
    MatButtonModule,
    CardBlogComponent,
    BaseChartDirective,
    MatCard,
    MatCardHeader,
    MatCardContent,
    NavbarComponent
  ],
  providers: [AuthService],
  styleUrls: ['./home.component.scss'],
   animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  cursos: any[] = [];
 trilhas = [
    {
      icon: 'school',
      title: 'Iniciante em Java',
      imageUrl: '/assets/courses/java-basics.jpg',
      link: '/curso-java-fundamentos',
      description: 'Aprenda os fundamentos da linguagem Java e programação orientada a objetos.',
      stats: {
        modules: 12,
        hours: 24,
        students: 1500
      }
    },
    {
      icon: 'code',
      title: 'Desenvolvimento Web',
      imageUrl: '/assets/courses/web-dev.jpg',
      link: '/curso-web-dev',
      description: 'Domine o desenvolvimento web com Spring Boot e tecnologias modernas.',
      stats: {
        modules: 15,
        hours: 30,
        students: 1200
      }
    },
    {
      icon: 'cloud',
      title: 'Arquitetura Cloud',
      link: '/curso-cloud',
      imageUrl: '/assets/courses/cloud-arch.jpg',
      description: 'Construa aplicações escaláveis com práticas de cloud computing.',
      stats: {
        modules: 10,
        hours: 20,
        students: 800
      }
    }
  ];

 cursosPopulares: Course[] = [
    {
      id: '1',
      title: 'Java Fundamentos',
      imageUrl: '/assets/courses/java-fundamentals.jpg',
      author: 'João Silva',
      description: 'Aprenda Java do zero com exercícios práticos',
      level: 'Iniciante',
      duration: '12h',
      rating: 4.8,
      instructor: 'João Silva',
      price: 199.90,
      totalStudents: 2500,
      categories: ['Java', 'Backend'],
      status: 'published',
      modules: [
        { title: 'Introdução', duration: '2h' },
        { title: 'POO', duration: '4h' }
      ],
      lastUpdate: new Date()
    },
    {
      id: '2',
      title: 'Spring Boot Essencial',
      imageUrl: '/assets/courses/spring-boot-essential.jpg',
      author: 'Maria Souza',
      description: 'Crie APIs RESTful com Spring Boot',
      level: 'Intermediário',
      duration: '8h',
      rating: 4.5,
      instructor: '',
      price: 0,
      totalStudents: 0,
      categories: [],
      status: 'draft',
      modules: [],
      lastUpdate: new Date()
    },
    {
      id: '3',
      title: 'Microsserviços com Spring Cloud',
      imageUrl: '/assets/courses/microservices.jpg',
      author: 'Pedro Santos',
      description: 'Arquitetura de microsserviços com Spring Cloud',
      level: 'Avançado',
      duration: '16h',
      rating: 4.7,
      instructor: '',
      price: 0,
      totalStudents: 0,
      categories: [],
      status: 'draft',
      modules: [],
      lastUpdate: new Date()
    }
  ];

  cursosRecentes: Course[] = [
    {
      id: '4',
      title: 'Angular para Iniciantes',
      imageUrl: '/assets/courses/angular.jpg',
      author: 'Ana Oliveira',
      description: 'Desenvolvimento web com Angular',
      level: 'Iniciante',
      duration: '10h',
      rating: 4.6,
      instructor: '',
      price: 0,
      totalStudents: 0,
      categories: [],
      status: 'draft',
      modules: [],
      lastUpdate: new Date()
    },
    {
      id: '5',
      title: 'React - O guia completo',
      imageUrl: '/assets/courses/react.jpg',
      author: 'Paulo Fernandes',
      description: 'Aprenda React com projetos práticos',
      level: 'Intermediário',
      duration: '14h',
      rating: 4.9,
      instructor: '',
      price: 0,
      totalStudents: 0,
      categories: [],
      status: 'draft',
      modules: [],
      lastUpdate: new Date()
    }
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
    }
  ];
 ngOnInit() {
    this.initializeCharts();
  }
  private initializeCharts() {
    // Configuração melhorada dos gráficos
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0,0,0,0.1)'
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'bottom'
        }
      }
    };
  }
  // Dados para os gráficos
  popularCoursesChartData = [
    {
      data: this.cursosPopulares.map(curso => curso.rating),
      label: 'Avaliação'
    }
  ];
  popularCoursesChartLabels = this.cursosPopulares.map(curso => curso.title);

  recentCoursesChartData = [
    {
      data: this.cursosRecentes.map(curso => curso.rating),
      label: 'Avaliação'
    }
  ];
  recentCoursesChartLabels = this.cursosRecentes.map(curso => curso.title);

  chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
}
