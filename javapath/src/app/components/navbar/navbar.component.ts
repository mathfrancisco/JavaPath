import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { AsyncPipe, NgIf } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

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
    AsyncPipe
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private authService = inject(AuthService);
  currentUser$ = this.authService.currentUser$;

  isLoggedOut(): boolean {
    return this.authService.isLoggedOut();
  }

  logout(): void {
    this.authService.logout();
  }
}
