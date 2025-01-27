// curso-detalhe.component.ts

import { MatIconModule } from '@angular/material/icon';
import {MatButton, MatButtonModule} from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTab, MatTabGroup, MatTabsModule} from '@angular/material/tabs';
import {Course} from '../../components/shared/types/course.types';
import {CourseService} from '../../services/cursos.service';

import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-curso-detalhe',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatProgressBarModule,

    MatIconModule,
    MatButton,
    MatTabGroup,
    MatTab
  ],
  templateUrl: './curso-detalhe.component.html',
  styleUrls: ['./curso-detalhe.component.css']
})
export class CursoDetalheComponent implements OnInit {
  curso: Course | null = null;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.courseService.getCourseById(id).subscribe(
        course => this.curso = course
      );
    }
  }
}
