import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {RouterLink, RouterLinkActive} from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatMenuModule,
    NgIf,
    AsyncPipe,
    MatDivider,
    NgForOf,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private authService = inject(AuthService);
  currentUser$ = this.authService.currentUser$;
  menuItems = [
    { path: '/cursos', label: 'Cursos', icon: 'school' },
    { path: '/blog', label: 'Blog', icon: 'article' },
    { path: '/sobre', label: 'Sobre', icon: 'info' },
    { path: '/contato', label: 'Contato', icon: 'contact_mail' }
  ];

  isLoggedOut(): boolean {
    return this.authService.isLoggedOut();
  }

  logout(): void {
    this.authService.logout();
  }
}
