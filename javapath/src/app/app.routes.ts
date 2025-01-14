import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';
import { inject } from '@angular/core';
import { AuthService } from './auth/auth.service';

// Guard auxiliar para verificar papel do usuário
const roleGuard = (allowedRoles: string[]) => {
  return () => {
    const authService = inject(AuthService);
    if (!authService.currentUserValue) return false;
    return allowedRoles.includes(authService.currentUserValue.role);
  };
};

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  // Rotas de Cursos
  {
    path: 'cursos',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/curso/curso.component').then(m => m.CursoComponent)
      },
      {
        path: 'buscar',
        loadComponent: () => import('./pages/curso/curso-busca/curso-busca.component')
          .then(m => m.CursoBuscaComponent)
      },
      {
        path: 'categoria/:categoria',
        loadComponent: () => import('./pages/curso/curso-categoria/curso-categoria.component')
          .then(m => m.CursoCategoriaComponent)
      },
      {
        path: ':id',
        loadComponent: () => import('./pages/curso-detalhe/curso-detalhe.component')
          .then(m => m.CursoDetalheComponent)
      },
      {
        path: ':id/aula/:aulaId',
        loadComponent: () => import('./pages/curso/curso-aula/curso-aula.component')
          .then(m => m.CursoAulaComponent),
        canActivate: [authGuard]
      }
    ]
  },
  // Área do Instrutor
  {
    path: 'instructor',
    canActivate: [authGuard, () => roleGuard(['instructor', 'admin'])()],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/instructor/dashboard/dashboard.component')
          .then(m => m.InstructorDashboardComponent)
      },
      {
        path: 'cursos',
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/instructor/cursos/cursos-list.component')
              .then(m => m.CursosListComponent)
          },
          {
            path: 'novo',
            loadComponent: () => import('./pages/instructor/cursos/curso-form.component')
              .then(m => m.CursoFormComponent)
          },
          {
            path: ':id/edit',
            loadComponent: () => import('./pages/instructor/cursos/curso-form.component')
              .then(m => m.CursoFormComponent)
          },
          {
            path: ':id/analytics',
            loadComponent: () => import('./pages/instructor/cursos/curso-analytics.component')
              .then(m => m.CursoAnalyticsComponent)
          }
        ]
      }
    ]
  },
  // Área do Admin
  {
    path: 'admin',
    canActivate: [authGuard, () => roleGuard(['admin'])()],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/admin/dashboard/dashboard.component')
          .then(m => m.AdminDashboardComponent)
      },
      {
        path: 'usuarios',
        loadComponent: () => import('./pages/admin/usuarios/usuarios.component')
          .then(m => m.UsuariosComponent)
      },
      {
        path: 'configuracoes',
        loadComponent: () => import('./pages/admin/configuracoes/configuracoes.component')
          .then(m => m.ConfiguracoesComponent)
      }
    ]
  },
  // Área do Aluno
  {
    path: 'student',
    canActivate: [authGuard, () => roleGuard(['student'])()],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/student/dashboard/dashboard.component')
          .then(m => m.StudentDashboardComponent)
      },
      {
        path: 'meus-cursos',
        loadComponent: () => import('./pages/student/meus-cursos/meus-cursos.component')
          .then(m => m.MeusCursosComponent)
      },
      {
        path: 'certificados',
        loadComponent: () => import('./pages/student/certificados/certificados.component')
          .then(m => m.CertificadosComponent)
      }
    ]
  },
  // Blog
  {
    path: 'blog',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/blog/blog.component').then(m => m.BlogComponent)
      },
      {
        path: 'categoria/:categoria',
        loadComponent: () => import('./pages/blog/blog-categoria/blog-categoria.component')
          .then(m => m.BlogCategoriaComponent)
      },
      {
        path: 'buscar',
        loadComponent: () => import('./pages/blog/blog-busca/blog-busca.component')
          .then(m => m.BlogBuscaComponent)
      },
      {
        path: ':id',
        loadComponent: () => import('./pages/blog-detalhe/blog-detalhe.component')
          .then(m => m.BlogDetalheComponent)
      }
    ]
  },
  // Autenticação
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
      },
      {
        path: 'recuperar-senha',
        loadComponent: () => import('./auth/recuperar-senha/recuperar-senha.component')
          .then(m => m.RecuperarSenhaComponent)
      },
      {
        path: 'redefinir-senha',
        loadComponent: () => import('./auth/redefinir-senha/redefinir-senha.component')
          .then(m => m.RedefinirSenhaComponent)
      }
    ]
  },
  // Perfil
  {
    path: 'perfil',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/perfil/perfil.component')
          .then(m => m.PerfilComponent)
      },
      {
        path: 'editar',
        loadComponent: () => import('./pages/perfil/perfil-editar/perfil-editar.component')
          .then(m => m.PerfilEditarComponent)
      },
      {
        path: 'configuracoes',
        loadComponent: () => import('./pages/perfil/perfil-configuracoes/perfil-configuracoes.component')
          .then(m => m.PerfilConfiguracoesComponent)
      }
    ]
  },
  // Outras rotas
  {
    path: 'contato',
    loadComponent: () => import('./pages/contato/contato.component').then(m => m.ContatoComponent)
  },
  {
    path: 'sobre',
    loadComponent: () => import('./pages/sobre/sobre.component').then(m => m.SobreComponent)
  },
  {
    path: 'faq',
    loadComponent: () => import('./pages/faq/faq.component').then(m => m.FaqComponent)
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