import { Component } from '@angular/core';
import { BlogPost } from '../../components/card-blog/card-blog.component';
import {CardBlogComponent} from '../../components/card-blog/card-blog.component';
import {NgForOf} from '@angular/common';
import {CardCursoComponent} from '../../components/card-curso/card-curso.component';
import {CarrosselComponent} from '../../components/carrossel/carrossel.component'; // Importe a interface

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    CardBlogComponent,
    NgForOf,
    CardCursoComponent,
    CarrosselComponent
  ],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // Simulação de dados para os cursos em destaque (carrossel)
  cursosParaCarrossel: Curso[] = [
    { id: 1, title: 'Curso 1', imageUrl: 'assets/images/curso1.jpg', author: 'Autor 1', description: 'Descrição do curso 1' },
    { id: 2, title: 'Curso 2', imageUrl: 'assets/images/curso2.jpg', author: 'Autor 2', description: 'Descrição do curso 2' },
    // ... mais cursos
  ];

  cursosPopulares: Curso[] = [ /* Cursos populares */ ];
  cursosRecentes: Curso[] = [ /* Cursos recentes */ ];

  posts: BlogPost[] = [
    {
      id: 1,
      title: 'Introdução ao Angular',
      imageUrl: 'assets/images/angular.jpg', // Substitua pela URL da sua imagem
      date: new Date(),
      author: 'João Silva',
      excerpt: 'Aprenda os fundamentos do Angular neste tutorial completo.',
      content: 'Conteúdo completo do post 1...'
    },
    {
      id: 2,
      title: 'Criando um blog com Angular',
      imageUrl: 'assets/images/blog.jpg',
      date: new Date(),
      author: 'Maria Souza',
      excerpt: 'Construa seu próprio blog com Angular e Tailwind CSS.',
      content: 'Conteúdo completo do post 2...'
    },
    // Adicione mais posts aqui
  ];
}



