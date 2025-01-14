import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent),
    title: 'JavaPath - Home', // para SEO e acessibilidade
  },
  {
    path: 'curso/:id', // :id é um parâmetro para identificar o curso
    loadComponent: () => import('./pages/curso/curso.component').then(c => c.CursoComponent),
    title: 'JavaPath - Curso',
  },
  {
    path: 'contato',
    loadComponent: () => import('./pages/contato/contato.component').then(c => c.ContatoComponent),
    title: 'JavaPath - Contato'
  },
  {
    path: '404', // Rota para página de erro 404
    loadComponent: () => import('./pages/not-found/not-found.component').then(c => c.NotFoundComponent),
    title: 'Página não encontrada',
  },
  { path: '**', redirectTo: '' }, // Redireciona qualquer rota desconhecida para a página 404
];

