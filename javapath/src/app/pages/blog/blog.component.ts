import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {NgIf} from '@angular/common';
import {CommentsSectionComponent} from '../../components/comments-section/comments-section.component';
import {BlogPost, CardBlogComponent} from '../../components/card-blog/card-blog.component'; // Importe a interface BlogPost

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  standalone: true,
  imports: [
    NgIf,
    CommentsSectionComponent
  ],
  styleUrls: ['./blog.component.scss']
})

export class BlogComponent implements OnInit {
  post!: BlogPost | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        const id = parseInt(idParam, 10);  // Converte o parâmetro 'id' para número

        this.buscarPost(id).then(post => {
          if(post) {
            this.post = post
          }
        }) // busca post de acordo com seu ID
      }
    });
  }



  async buscarPost(id: number): Promise<BlogPost | undefined> {
    // Simulação de busca de dados (substitua pela chamada à API quando tiver o backend)
    const posts: BlogPost[] = [
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

    return posts.find(p => p.id === id);
  }


}


