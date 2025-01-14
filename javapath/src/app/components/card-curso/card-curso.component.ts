import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {RouterLink} from '@angular/router';

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
  selector: 'app-card-curso',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './card-curso.component.html',
  styleUrl: './card-curso.component.css'
})
export class CardCursoComponent {
  @Input() curso!: Curso;
}

