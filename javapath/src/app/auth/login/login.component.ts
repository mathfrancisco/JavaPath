import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { AuthService } from '../authservice.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  constructor(private authService: AuthService) {

  }

  login(form: NgForm) {
    if (form.valid) {
      this.authService.login(form.value.username);
    }
  }
}

