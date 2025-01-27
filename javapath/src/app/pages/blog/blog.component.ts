import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgIf, DatePipe, NgClass, CommonModule } from '@angular/common';
import {CommentsSectionComponent} from '../../components/comments-section/comments-section.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {NavbarComponent} from '../../components/navbar/navbar.component';

export interface BlogPost {
  id: number;
  title: string;
  subtitle?: string;
  imageUrl: string;
  date: Date;
  author: string;
  authorAvatar: string;
  excerpt: string;
  content: string;
  readTime: number;
  category: string;
  tags?: string[]; // Certifique-se de que esta propriedade está definida como opcional
  comments?: any[];
  relatedPosts?: BlogPost[];
  socialShares?: number;
}


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgIf,
    DatePipe,
    CommentsSectionComponent,
    FooterComponent,
    NavbarComponent
  ],
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  post!: BlogPost | undefined; // O post atual
  isHeaderVisible = false; // Controla a visibilidade do cabeçalho flutuante
  currentSection = ''; // Identifica a seção atual para o índice

  // Simulação de posts (substitua por uma chamada de API real)
  private blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Introdução ao Angular',
      subtitle: 'Aprenda os fundamentos do Angular',
      imageUrl: '/assets/images/blog/angular-intro.jpg',
      date: new Date('2023-10-01'),
      author: 'João Silva',
      authorAvatar: '/assets/images/authors/joao.jpg',
      excerpt: 'Descubra como começar com Angular e criar aplicações incríveis.',
      content: '<p>Este é o conteúdo completo do post sobre Angular.</p>',
      readTime: 5,
      category: 'Angular',
      tags: ['Angular', 'Frontend', 'JavaScript'],
      comments: [
        { id: 1, author: 'Maria', content: 'Ótimo artigo!' },
        { id: 2, author: 'Carlos', content: 'Muito útil, obrigado!' }
      ],
      relatedPosts: [
        {
          id: 2,
          title: 'Componentes no Angular',
          imageUrl: '/assets/images/blog/angular-components.jpg',
          date: new Date('2023-09-15'),
          author: 'Maria Souza',
          authorAvatar: '/assets/images/authors/maria.jpg',
          excerpt: 'Aprenda a criar e usar componentes no Angular.',
          content: '',
          readTime: 7,
          category: 'Angular'
        }
      ],
      socialShares: 120
    },
    {
      id: 2,
      title: 'Componentes no Angular',
      subtitle: 'Criação e uso de componentes',
      imageUrl: '/assets/images/blog/angular-components.jpg',
      date: new Date('2023-09-15'),
      author: 'Maria Souza',
      authorAvatar: '/assets/images/authors/maria.jpg',
      excerpt: 'Aprenda a criar e usar componentes no Angular.',
      content: '<p>Este é o conteúdo completo do post sobre componentes no Angular.</p>',
      readTime: 7,
      category: 'Angular',
      tags: ['Angular', 'Componentes'],
      comments: [],
      relatedPosts: [],
      socialShares: 80
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Obtém o ID do post da rota
    this.route.params.subscribe(params => {
      const postId = +params['id']; // Converte o ID para número
      this.post = this.blogPosts.find(post => post.id === postId); // Busca o post correspondente
    });

    // Adiciona listener para o scroll
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll() {
    const scrollPosition = window.scrollY;
    this.isHeaderVisible = scrollPosition > 300;

    // Identifica a seção atual para o índice
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      const sectionTop = (section as HTMLElement).offsetTop;
      if (scrollPosition >= sectionTop - 100) {
        this.currentSection = section.id;
      }
    });
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  sharePost(platform: string) {
    // Implementa o compartilhamento em redes sociais
    const url = window.location.href;
    let shareUrl = '';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(this.post?.title || '')}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(url)}&title=${encodeURIComponent(this.post?.title || '')}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  }
}
