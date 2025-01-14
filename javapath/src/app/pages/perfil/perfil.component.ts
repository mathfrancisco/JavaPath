import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CursosService } from '../../services/cursos.service';

interface BaseProfile {
  id: number;
  username: string;
  nome: string;
  email: string;
  avatar: string;
  bio: string;
}

interface StudentProfile extends BaseProfile {
  cursosMatriculados: number;
  cursosConcluidos: number;
  certificados: number;
  progresso: {
    cursosEmAndamento: Array<{
      id: number;
      titulo: string;
      progresso: number;
      thumbnail: string;
    }>;
    certificadosRecentes: Array<{
      id: number;
      curso: string;
      dataEmissao: Date;
    }>;
  };
}

interface InstructorProfile extends BaseProfile {
  cursosCriados: number;
  alunosAtivos: number;
  avaliacaoMedia: number;
  cursos: Array<{
    id: number;
    titulo: string;
    alunosMatriculados: number;
    avaliacaoMedia: number;
    thumbnail: string;
  }>;
  estatisticas: {
    totalAulas: number;
    totalHoras: number;
    totalAlunos: number;
  };
}

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    RouterModule
  ],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  userProfile: StudentProfile | InstructorProfile | null = null;
  userRole: 'student' | 'instructor' | 'admin' = 'student';

  constructor(
    private authService: AuthService,
    private cursosService: CursosService
  ) {}

  ngOnInit() {
    this.userRole = this.authService.currentUserValue?.role || 'student'; // Use optional chaining here as well
    this.loadUserProfile();
  }

  loadUserProfile() {
    // Use optional chaining and nullish coalescing operator here
    if (this.authService.currentUserValue) {
      this.userRole = this.authService.currentUserValue.role; // Safe to access here
      if (this.userRole === 'student') {
        this.loadStudentProfile();
      } else {
        this.loadInstructorProfile();
      }
    } else {
      // Handle the case where currentUserValue is null
      // 1. Redirect to login:
      // this.router.navigate(['/login']);  // Requires injecting Router

      // 2. Set a default profile:
      // this.userProfile = { /* ... default profile data ... */ };

      // 3. Show a message/spinner:
      // console.log("User not logged in"); // Or use a loading indicator in your template
    }
  }

  private loadStudentProfile() {
    const currentUser = this.authService.currentUserValue!;  // Non-null assertion

    // Simulação de carregamento do perfil do aluno
    this.userProfile = {
      id: 1,
      username: currentUser.username,
      nome: 'Nome do Aluno',
      email: 'aluno@email.com',
      avatar: '/assets/avatar-placeholder.jpg',
      bio: 'Estudante dedicado de programação',
      cursosMatriculados: 5,
      cursosConcluidos: 3,
      certificados: 3,
      progresso: {
        cursosEmAndamento: [
          {
            id: 1,
            titulo: 'Java Fundamentos',
            progresso: 75,
            thumbnail: '/assets/curso1.jpg'
          }
        ],
        certificadosRecentes: [
          {
            id: 1,
            curso: 'Lógica de Programação',
            dataEmissao: new Date()
          }
        ]
      }
    };
  }

  private loadInstructorProfile() {
    const currentUser = this.authService.currentUserValue!; // Non-null assertion

    // Simulação de carregamento do perfil do instrutor
    this.userProfile = {
      id: 2,
      username: currentUser.username,
      nome: 'Nome do Instrutor',
      email: 'instrutor@email.com',
      avatar: '/assets/avatar-placeholder.jpg',
      bio: 'Instrutor especialista em Java',
      cursosCriados: 10,
      alunosAtivos: 150,
      avaliacaoMedia: 4.8,
      cursos: [
        {
          id: 1,
          titulo: 'Java Avançado',
          alunosMatriculados: 50,
          avaliacaoMedia: 4.9,
          thumbnail: '/assets/curso2.jpg'
        }
      ],
      estatisticas: {
        totalAulas: 120,
        totalHoras: 240,
        totalAlunos: 500
      }
    };
  }

  isStudent(): boolean {
    return this.userRole === 'student';
  }

  isInstructor(): boolean {
    return this.userRole === 'instructor' || this.userRole === 'admin';
  }

  getStudentProfile(): StudentProfile {
    return this.userProfile as StudentProfile;
  }

  getInstructorProfile(): InstructorProfile {
    return this.userProfile as InstructorProfile;
  }

  logout() {
    this.authService.logout();
  }
}
