import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';
import { inject } from '@angular/core';
import { AuthService } from './auth/auth.service';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'cursos',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/curso/curso.component').then(m => m.CursoComponent)
      },
      {
        path: ':id',
        loadComponent: () => import('./pages/curso-detalhe/curso-detalhe.component')
          .then(m => m.CursoDetalheComponent)
      }
    ]
  },
  {
    path: 'blog',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/blog/blog.component').then(m => m.BlogComponent)
      },
      {
        path: ':id',
        loadComponent: () => import('./pages/blog-detalhe/blog-detalhe.component')
          .then(m => m.BlogDetalheComponent)
      }
    ]
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent),
        canActivate: [() => inject(AuthService).isLoggedOut()]
      },
      {
        path: 'register',
        loadComponent: () => import('./auth/register/register.component')
          .then(m => m.RegisterComponent),
        canActivate: [() => inject(AuthService).isLoggedOut()]
      }
    ]
  },
  {
    path: 'perfil',
    loadComponent: () => import('./pages/perfil/perfil.component').then(m => m.PerfilComponent),
    canActivate: [authGuard]
  },
  {
    path: 'contato',
    loadComponent: () => import('./pages/contato/contato.component').then(m => m.ContatoComponent)
  },
  {
    path: '404',
    loadComponent: () => import('./pages/not-found/not-found.component')
      .then(m => m.NotFoundComponent)
  },
  {
    path: '**',
    redirectTo: '404'
  }
];
