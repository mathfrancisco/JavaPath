// blog-detalhe.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface BlogPost {
  id: number;
  title: string;
  subtitle?: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
    socialLinks: {
      twitter?: string;
      linkedin?: string;
      github?: string;
    }
  };
  publishedDate: Date;
  readTime: number;
  category: string;
  tags: string[];
  coverImage: string;
  images: string[];
  relatedPosts: RelatedPost[];
  likes: number;
  views: number;
}

interface RelatedPost {
  id: number;
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  publishedDate: Date;
}

@Component({
  selector: 'app-blog-detalhe',
  templateUrl: './blog-detalhe.component.html',
  styleUrls: ['./blog-detalhe.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class BlogDetalheComponent implements OnInit {
  post: BlogPost | undefined;
  isLoading = true;
  showNewsletter = false;
  currentSection = '';
  
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Simular carregamento do post
    this.route.params.subscribe(params => {
      setTimeout(() => {
        this.loadPost(params['id']);
        this.isLoading = false;
      }, 1000);
    });

    // Observer para o Intersection Observer API
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.currentSection = entry.target.id;
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observar seções para o índice
    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });
  }

  loadPost(id: number) {
    // Simular dados do post (substitua por chamada real à API)
    this.post = {
      id: 1,
      title: 'Desenvolvendo Aplicações Modernas com Angular',
      subtitle: 'Um guia completo sobre as melhores práticas e padrões de projeto',
      content: `
        <section id="introducao">
          <h2>Introdução</h2>
          <p>Conteúdo da introdução...</p>
        </section>
        <section id="conceitos-basicos">
          <h2>Conceitos Básicos</h2>
          <p>Explicação dos conceitos fundamentais...</p>
        </section>
        <!-- Mais seções do conteúdo -->
      `,
      author: {
        name: 'João Silva',
        avatar: '/assets/images/avatar.jpg',
        bio: 'Desenvolvedor Full Stack com mais de 10 anos de experiência',
        socialLinks: {
          twitter: 'https://twitter.com/joaosilva',
          linkedin: 'https://linkedin.com/in/joaosilva',
          github: 'https://github.com/joaosilva'
        }
      },
      publishedDate: new Date(),
      readTime: 15,
      category: 'Desenvolvimento Web',
      tags: ['Angular', 'TypeScript', 'Web Development'],
      coverImage: '/assets/images/cover.jpg',
      images: [],
      relatedPosts: [
        {
          id: 2,
          title: 'Otimização de Performance em Angular',
          excerpt: 'Aprenda a otimizar sua aplicação Angular...',
          coverImage: '/assets/images/related1.jpg',
          author: 'Maria Santos',
          publishedDate: new Date()
        },
        // Mais posts relacionados
      ],
      likes: 123,
      views: 1234
    };
  }

  likePost() {
    if (this.post) {
      this.post.likes++;
    }
  }

  subscribeNewsletter(email: string) {
    console.log('Email inscrito:', email);
    this.showNewsletter = false;
  }

  sharePost(platform: string) {
    // Implementar compartilhamento
    console.log(`Compartilhando no ${platform}`);
  }
}