import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-card-curso',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './card-curso.component.html',
  styleUrl: './card-curso.component.css'
})
export class CardCursoComponent {
  @Input() curso!: Curso;
}

