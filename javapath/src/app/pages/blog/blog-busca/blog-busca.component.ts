import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {BlogPost, CardBlogComponent} from '../../../components/card-blog/card-blog.component';
import {BlogService} from '../../../services/blog.service';
import {adaptPostToBlogPost} from './adapt-post-to-blog-post';


@Component({
  selector: 'app-blog-busca',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CardBlogComponent
  ],
  templateUrl: './blog-busca.component.html',
  styleUrls: ['./blog-busca.component.css']
})
export class BlogBuscaComponent implements OnInit {
  posts: BlogPost[] = []; // Agora usamos o tipo BlogPost
  searchTerm = '';
  availableTags: string[] = ['Java', 'Spring', 'Angular', 'TypeScript'];
  selectedTags: string[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.loadPosts();
  }

  // Carrega os posts e os adapta para o formato BlogPost
  loadPosts() {
    this.blogService
      .getPosts(this.searchTerm, this.selectedTags)
      .subscribe(posts => {
        this.posts = posts.map(adaptPostToBlogPost); // Adapta os posts
      });
  }

  // Atualiza os posts ao buscar por termo
  onSearch() {
    this.loadPosts();
  }

  // Adiciona ou remove uma tag da lista de tags selecionadas
  toggleTag(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index === -1) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags.splice(index, 1);
    }
    this.loadPosts();
  }
}
