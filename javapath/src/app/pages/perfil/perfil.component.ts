import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/authservice.service';
import { CursosService } from '../../services/cursos.service';

interface UserProfile {
  id: number;
  username: string;
  nome: string;
  email: string;
  avatar: string;
  bio: string;
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
  userProfile: UserProfile | null = null;

  constructor(
    private authService: AuthService,
    private cursosService: CursosService
  ) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    if (this.authService.currentUserValue) {
      // Simular carregamento do perfil - substituir por chamada real à API
      this.userProfile = {
        id: 1,
        username: this.authService.currentUserValue.username,
        nome: 'Nome Completo',
        email: 'usuario@email.com',
        avatar: '/assets/avatar-placeholder.jpg',
        bio: 'Desenvolvedor apaixonado por tecnologia',
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
  }

  logout() {
    this.authService.logout();
  }
}
