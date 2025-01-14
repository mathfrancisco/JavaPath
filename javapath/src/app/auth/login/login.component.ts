// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <!-- Logo -->
        <div class="text-center">
          <img class="mx-auto h-12 w-auto" src="assets/logo.png" alt="JavaPath Logo">
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
            Bem-vindo ao JavaPath
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            Sua jornada no aprendizado de Java começa aqui
          </p>
        </div>

        <!-- Form -->
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="mt-8 space-y-6">
          <div class="rounded-md shadow-sm space-y-4">
            <!-- Role Selection -->
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Tipo de Acesso</mat-label>
              <mat-select formControlName="role">
                <mat-option value="student">Aluno</mat-option>
                <mat-option value="instructor">Instrutor</mat-option>
                <mat-option value="admin">Administrador</mat-option>
              </mat-select>
              <mat-error *ngIf="loginForm.get('role')?.hasError('required')">
                Selecione o tipo de acesso
              </mat-error>
            </mat-form-field>

            <!-- Username -->
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Nome de usuário</mat-label>
              <input matInput formControlName="username" type="text">
              <mat-icon matPrefix class="mr-2">person</mat-icon>
              <mat-error *ngIf="loginForm.get('username')?.hasError('required')">
                Username é obrigatório
              </mat-error>
            </mat-form-field>

            <!-- Password -->
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Senha</mat-label>
              <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password">
              <mat-icon matPrefix class="mr-2">lock</mat-icon>
              <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
                Senha é obrigatória
              </mat-error>
            </mat-form-field>
          </div>

          <!-- Submit Button -->
          <div>
            <button mat-raised-button color="primary" 
                    class="w-full justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white"
                    [disabled]="loginForm.invalid || isLoading" 
                    type="submit">
              <mat-spinner *ngIf="isLoading" [diameter]="20" class="mr-2"></mat-spinner>
              <span>{{ isLoading ? 'Entrando...' : 'Entrar' }}</span>
            </button>
          </div>

          <!-- Error Message -->
          <div *ngIf="errorMsg" class="mt-2 text-center text-sm text-red-600">
            {{ errorMsg }}
          </div>

          <!-- Links -->
          <div class="flex items-center justify-between">
            <div class="text-sm">
              <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                Esqueceu sua senha?
              </a>
            </div>
            <div class="text-sm">
              <a routerLink="/register" class="font-medium text-indigo-600 hover:text-indigo-500">
                Criar uma conta
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  errorMsg = '';
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['student', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Redirecionar se já estiver logado
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMsg = '';

      try {
        const { username, password, role } = this.loginForm.value;
        await this.authService.login(username, password, role);
        
        this.snackBar.open('Login realizado com sucesso!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });

        // Redirecionar baseado no papel do usuário
        switch (role) {
          case 'student':
            this.router.navigate(['/student/dashboard']);
            break;
          case 'instructor':
            this.router.navigate(['/instructor/dashboard']);
            break;
          case 'admin':
            this.router.navigate(['/admin/dashboard']);
            break;
          default:
            this.router.navigate(['/dashboard']);
        }
      } catch (error) {
        this.errorMsg = 'Usuário ou senha inválidos';
        this.snackBar.open('Erro ao realizar login', 'Fechar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      } finally {
        this.isLoading = false;
      }
    }
  }
}