import { Component } from '@angular/core';
import { AuthService } from '../../auth/authservice.service';
import {NgIf} from '@angular/common';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  standalone: true,
  imports: [
    NgIf
  ],
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
  currentUser = this.authService.currentUserValue // current user do auth service
  constructor(private authService: AuthService) {


  }


  logout() {
    this.authService.logout();
  }
}



