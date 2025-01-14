// search.component.ts
import { Component } from '@angular/core';
import {BlogPost, CardBlogComponent} from '../card-blog/card-blog.component';
import {CardCursoComponent, Curso} from '../card-curso/card-curso.component';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  standalone: true,
  imports: [
    CardCursoComponent,
    FormsModule,
    NgIf,
    CardBlogComponent,
    NgForOf
  ],
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchTerm: string = '';
  cursosEncontrados: Curso[] = [];
  postsEncontrados: BlogPost[] = [];
  allCursos: Curso[] = [];
  allPosts: BlogPost[] = [];


  constructor() {
    // Simulando a busca de dados (substitua pela chamada à API quando tiver o backend)
    this.allCursos = [
      { id: 1, title: 'Curso de Angular', imageUrl: 'assets/images/angular.jpg', author: 'João Silva', description: 'Aprenda Angular de forma prática.' },
      { id: 2, title: 'Curso de React', imageUrl: 'assets/images/react.jpg', author: 'Maria Souza', description: 'Domine o desenvolvimento web com React.' },
      // ... mais cursos
    ];


    this.allPosts = [
      {
        id: 1,
        title: 'Post 1',
        imageUrl: '/assets/images/post1.jpg',
        date: new Date(),
        author: 'Autor 1',
        excerpt: 'Resumo do post 1',
        content: '<p>Conteúdo completo do Post 1.</p>',
        authorAvatar: '',
        readTime: 0,
        category: ''
      },
      {
        id: 2,
        title: 'Post 2',
        imageUrl: '/assets/images/post2.jpg',
        date: new Date(),
        author: 'Autor 2',
        excerpt: 'Resumo do post 2',
        content: '<p>Conteúdo completo do Post 2.</p>',
        authorAvatar: '',
        readTime: 0,
        category: ''
      },

      // Adicione mais posts aqui
    ];
  }



  search() {
    const searchTermLower = this.searchTerm.toLowerCase();

    this.cursosEncontrados = this.allCursos.filter(curso =>
      curso.title.toLowerCase().includes(searchTermLower) ||
      curso.description.toLowerCase().includes(searchTermLower)
    );


    this.postsEncontrados = this.allPosts.filter(post =>
      post.title.toLowerCase().includes(searchTermLower) ||
      post.excerpt.toLowerCase().includes(searchTermLower) ||
      post.content?.toLowerCase().includes(searchTermLower)
    );

  }


}



