// footer.component.ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule, MatIconModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  socialLinks = [
    { icon: 'facebook', url: '#' },
    { icon: 'twitter', url: '#' },
    { icon: 'linkedin', url: '#' },
    { icon: 'youtube', url: '#' }
  ];

  sections = [
    {
      title: 'Cursos Populares',
      links: [
        { text: 'Lógica de Programação', url: '/curso/logica' },
        { text: 'Python para Iniciantes', url: '/curso/python' },
        { text: 'Java Fundamentos', url: '/curso/java' },
        { text: 'Desenvolvimento Web', url: '/curso/web' }
      ]
    },
    {
      title: 'Links Úteis',
      links: [
        { text: 'Política de Privacidade', url: '/privacidade' },
        { text: 'Termos de Uso', url: '/termos' },
        { text: 'FAQ', url: '/faq' },
        { text: 'Blog', url: '/blog' }
      ]
    },
    {
      title: 'Contato',
      links: [
        { text: 'contato@javapath.com', url: 'mailto:contato@javapath.com' },
        { text: 'Suporte', url: '/suporte' },
        { text: 'Carreiras', url: '/carreiras' },
        { text: 'Parcerias', url: '/parcerias' }
      ]
    }
  ];
}
