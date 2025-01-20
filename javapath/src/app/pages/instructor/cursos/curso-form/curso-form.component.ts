// curso-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { InstructorService } from '../../../services/instructor.service';
import { Course } from '../../../components/shared/types/course.types';

@Component({
  selector: 'app-curso-form',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule],
  templateUrl: './curso-form.component.html',
  styleUrl: './curso-form.component.css'
})
export class CursoFormComponent implements OnInit {
  cursoForm: FormGroup;
  isEditMode = false;
  selectedFileName = '';
  private cursoId?: number;

  constructor(
    private fb: FormBuilder,
    private instructorService: InstructorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.cursoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      level: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      duration: [0, [Validators.required, Validators.min(0)]],
      imageUrl: ['']
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.cursoId = +params['id'];
        this.loadCurso();
      }
    });
  }

  private loadCurso() {
    if (this.cursoId) {
      this.instructorService.getCursoById(this.cursoId).subscribe({
        next: (curso) => {
          this.cursoForm.patchValue(curso);
        },
        error: (error) => {
          console.error('Erro ao carregar curso:', error);
        }
      });
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      if (this.cursoId) {
        this.instructorService.uploadMaterial(this.cursoId, file).subscribe({
          next: (response) => {
            this.cursoForm.patchValue({ imageUrl: response.url });
          },
          error: (error) => {
            console.error('Erro no upload:', error);
          }
        });
      }
    }
  }

  onSubmit() {
    if (this.cursoForm.valid) {
      const cursoData = this.cursoForm.value;
      
      if (this.isEditMode && this.cursoId) {
        this.instructorService.updateCurso(this.cursoId, cursoData).subscribe({
          next: () => this.router.navigate(['/instructor/cursos']),
          error: (error) => console.error('Erro ao atualizar curso:', error)
        });
      } else {
        this.instructorService.createCurso(cursoData).subscribe({
          next: () => this.router.navigate(['/instructor/cursos']),
          error: (error) => console.error('Erro ao criar curso:', error)
        });
      }
    }
  }

  onCancel() {
    this.router.navigate(['/instructor/cursos']);
  }
}
