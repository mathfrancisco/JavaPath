// curso.component.ts
import {Component,  OnInit} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {NgForOf} from '@angular/common';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { NgIf } from '@angular/common';

interface Curso {
  topicosAula: TopicoAula[];
  id: number;
  title: string;
  imageUrl: string;
  author: string;
  description: string;
  videoUrl: string;
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
    NgForOf,
    MatCardModule, MatButtonModule, MatIconModule,
    NgIf, RouterLink
  ],
  styleUrls: ['./curso.component.scss']
})
export class CursoComponent implements OnInit {
  cursos: Curso[] = [];
  safeVideoUrl: SafeResourceUrl = '';
  topicosAula: TopicoAula[] = [];
  loading = false;  // Add loading state
  error: string | null = null; // Add error state

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
  }

  async ngOnInit() {
    this.loading = true; // Set loading to true before fetching
    try {
      this.cursos = await this.buscarTodosCursos();
    } catch (e) {
      this.error = 'Error fetching courses'; // Set error message if fetch fails
      console.error("Error fetching courses:", e) // Log error to console
    } finally {
      this.loading = false; // Set loading to false after fetch completes, regardless of success or failure
    }
  }

  async buscarTodosCursos(): Promise<Curso[]> {
    try {
      const response = await fetch('/api/cursos'); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json() as Curso[];
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  }

}




