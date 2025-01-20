// material-upload.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { InstructorService } from '../../../services/instructor.service';
import { Material } from '../../../components/shared/types/course.types';

@Component({
  selector: 'app-material-upload',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatSnackBarModule
  ],
  template: `
    <mat-card class="p-4">
      <mat-card-header>
        <mat-card-title>Materiais do Curso</mat-card-title>
      </mat-card-header>
      
      <mat-card-content>
        <div class="materials-list my-4">
          <div *ngFor="let material of materials" class="flex items-center justify-between p-2 border-b">
            <div class="flex items-center">
              <mat-icon [ngSwitch]="material.type" class="mr-2">
                {{material.type === 'pdf' ? 'picture_as_pdf' : 
                  material.type === 'video' ? 'video_library' : 'assignment'}}
              </mat-icon>
              <span>{{material.title}}</span>
            </div>
            <button mat-icon-button (click)="deleteMaterial(material.id)">
              <mat-icon>delete</mat-icon>
            </button>
          </div>
        </div>

        <div class="upload-section">
          <input
            type="file"
            #fileInput
            (change)="onFileSelected($event)"
            style="display: none"
            accept=".pdf,.mp4,.doc,.docx"
          >
          
          <button mat-raised-button color="primary" (click)="fileInput.click()">
            <mat-icon>cloud_upload</mat-icon>
            Adicionar Material
          </button>

          <div *ngIf="uploadProgress > 0" class="mt-4">
            <mat-progress-bar mode="determinate" [value]="uploadProgress"></mat-progress-bar>
            <p class="text-sm text-gray-600 mt-1">{{uploadProgress}}% Enviado</p>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `
})
export class MaterialUploadComponent {
  @Input() cursoId!: number;
  materials: Material[] = [];
  uploadProgress = 0;

  constructor(
    private instructorService: InstructorService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadMaterials();
  }

  loadMaterials() {
    // Adicionar método no service para buscar materiais
    this.instructorService.getMaterials(this.cursoId).subscribe({
      next: (materials) => {
        this.materials = materials;
      },
      error: (error) => {
        console.error('Erro ao carregar materiais:', error);
        this.showMessage('Erro ao carregar materiais');
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Simular progresso do upload
      const interval = setInterval(() => {
        this.uploadProgress += 10;
        if (this.uploadProgress >= 100) {
          clearInterval(interval);
        }
      }, 200);

      this.instructorService.uploadMaterial(this.cursoId, file).subscribe({
        next: (response) => {
          this.materials.push({
            id: response.id,
            title: file.name,
            type: this.getFileType(file),
            url: response.url
          });
          this.showMessage('Material enviado com sucesso!');
          this.uploadProgress = 0;
        },
        error: (error) => {
          console.error('Erro no upload:', error);
          this.showMessage('Erro ao enviar material');
          this.uploadProgress = 0;
        }
      });
    }
  }

  deleteMaterial(materialId: string) {
    if (confirm('Tem certeza que deseja excluir este material?')) {
      // Adicionar método no service para deletar material
      this.instructorService.deleteMaterial(this.cursoId, materialId).subscribe({
        next: () => {
          this.materials = this.materials.filter(m => m.id !== materialId);
          this.showMessage('Material excluído com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao excluir material:', error);
          this.showMessage('Erro ao excluir material');
        }
      });
    }
  }

  private getFileType(file: File): 'pdf' | 'video' | 'exercise' {
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (extension === 'pdf') return 'pdf';
    if (['mp4', 'webm'].includes(extension || '')) return 'video';
    return 'exercise';
  }

  private showMessage(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
