// blog.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgIf, DatePipe, NgClass, CommonModule } from '@angular/common';
import { CommentsSectionComponent } from '../../components/comments-section/comments-section.component';

interface BlogPost {
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
  tags?: string[];
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
    CommentsSectionComponent,
    DatePipe
  ],
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  post!: BlogPost | undefined;
  isHeaderVisible = false;
  currentSection = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // ... seu código existente ...

    // Adicionar listener para o scroll
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll() {
    const scrollPosition = window.scrollY;
    this.isHeaderVisible = scrollPosition > 300;
    
    // Identificar seção atual para o índice
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
    // Implementar compartilhamento em redes sociais
    console.log(`Sharing on ${platform}`);
  }
}