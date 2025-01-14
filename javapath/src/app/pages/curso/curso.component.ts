// curso.component.ts
import {Component, Input, OnInit} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {LowerCasePipe, NgForOf} from '@angular/common';
import {CommentsSectionComponent} from '../../components/comments-section/comments-section.component';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';

export interface Curso {
  id: number;
  title: string;
  imageUrl: string;
  author: string;
  description: string;
  duration?: string;
  level?: string;
  rating?: number;
}


@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  standalone: true,
  imports: [
    LowerCasePipe,
    NgForOf,
    CommentsSectionComponent,
    MatCardModule, MatButtonModule, MatIconModule
  ],
  styleUrls: ['./curso.component.scss']
})
export class CursoComponent implements OnInit {
  idCurso!: number;
  nomeCurso: string = '';  // ou title
  descricaoCurso: string = '';
  urlVideo: SafeResourceUrl = '';
  topicosAula: TopicoAula[] = [];


  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer // Injetando DomSanitizer
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.idCurso = parseInt(idParam);
        this.carregarDadosCurso(); // Chame a função para carregar os dados
      }


    });
  }


  carregarDadosCurso() {
    // Simulando a busca dos dados do curso (substitua pela sua lógica de API)
    // simulando um backend, troque por uma chamada de api quando tiver o backend

    switch (this.idCurso) {
      case 1:
        this.nomeCurso = 'Curso de Angular';
        this.descricaoCurso = 'Aprenda os fundamentos do Angular e crie aplicações web modernas.';
        this.urlVideo = this.sanitizer.bypassSecurityTrustResourceUrl('URL_DO_VÍDEO_DO_YOUTUBE_1'); // Sanitizando a URL do vídeo
        this.topicosAula = [
          { titulo: 'Introdução ao Angular', conteudo: 'Conteúdo do tópico 1...' },
          { titulo: 'Componentes', conteudo: 'Conteúdo do tópico 2...' },
          // ... mais tópicos
        ];
        break;
      case 2:
        this.nomeCurso = 'Curso de React';
        this.descricaoCurso = 'Domine o desenvolvimento web com React e crie interfaces ricas e interativas.';
        this.urlVideo = this.sanitizer.bypassSecurityTrustResourceUrl('URL_DO_VÍDEO_DO_YOUTUBE_2'); // Sanitizando a URL do vídeo
        this.topicosAula = [
          { titulo: 'Introdução ao React', conteudo: 'Conteúdo do tópico 1...' },
          { titulo: 'Componentes', conteudo: 'Conteúdo do tópico 2...' },
          // ... mais tópicos
        ];
        break;

      // Adicione casos para outros cursos
      default:
        this.nomeCurso = 'Curso Não Encontrado';
        this.descricaoCurso = 'O curso que você está procurando não foi encontrado.';
        break; // ou redirecione para uma página 404
    }
  }
}


