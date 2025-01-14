// card-blog.component.ts
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {share} from 'rxjs';

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  author: string;
  authorAvatar: string;
  date: Date;
  readTime: number;
  category: string;
  content ?: string;
}

@Component({
  selector: 'app-card-blog',
  standalone: true,
  imports: [RouterLink, CommonModule, MatIconModule, MatButtonModule, MatMenuItem, MatMenu, MatMenuTrigger],
  templateUrl: './card-blog.component.html',
  styleUrls: ['./card-blog.component.css']
})
export class CardBlogComponent {
  @Input() post!: BlogPost;

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  share(platform: string): void {
    let url = `https://example.com/blog/${this.post.id}`; // Replace with your actual blog post URL

    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(this.post.title)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
    }

    window.open(url, '_blank');
  }
}

