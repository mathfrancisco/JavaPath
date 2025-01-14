// curso.component.ts
import {Component, Input, OnInit} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {LowerCasePipe, NgForOf} from '@angular/common';
import {CommentsSectionComponent} from '../../components/comments-section/comments-section.component';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import { NgIf } from '@angular/common';

interface Curso {
  topicosAula: TopicoAula[];
  id: number;
  title: string;
  imageUrl: string;
  author: string;
  description: string;
  videoUrl: string; // Corrected property name
  duration?: string;
  level?: string;
  rating?: number;
  comments?: any[];
  recursos: Recurso[];
}


interface TopicoAula {
  titulo: string;
  conteudo: string;
}

interface Recurso {
  nome: string;
  downloadUrl: string;
}

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  standalone: true,
  imports: [
    LowerCasePipe,
    NgForOf,
    CommentsSectionComponent,
    MatCardModule, MatButtonModule, MatIconModule,
    NgIf
  ],
  styleUrls: ['./curso.component.scss']
})
export class CursoComponent implements OnInit {
  curso!: Curso;
  safeVideoUrl: SafeResourceUrl = '';
  topicosAula: TopicoAula[] = [];


  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer // Injetando DomSanitizer
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        const id = parseInt(idParam, 10);
        this.buscarCurso(id).then(curso => { this.curso = curso!;
          if (this.curso && this.curso.videoUrl) {
            this.topicosAula = this.curso.topicosAula || [];
            this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.curso.videoUrl);
          }

        });
      }
    });
  }

  async buscarCurso(id: number): Promise<Curso | undefined> {
    const cursos: Curso[] = [
      // Example data. Update this with your actual data.
      {
        topicosAula: [{ titulo: 'Introdução', conteudo: '...' }],
        id: 1,
        title: 'Curso 1',
        imageUrl: '',
        author: '',
        description: '',
        videoUrl: 'https://www.youtube.com/embed/your-video-id', // Use a valid YouTube embed URL. Update according to your course
        recursos: [{ nome: 'Recurso 1', downloadUrl: '...' }]
      }
      // ... more courses
    ];

    return cursos.find(c => c.id === id);
  }
}





