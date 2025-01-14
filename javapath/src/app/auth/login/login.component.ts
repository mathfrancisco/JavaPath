import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { AuthService } from '../auth.service';

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

  login(form: NgForm): void {
    if (form.valid) {
      const username = form.value.username;
      const password = form.value.password;
      this.authService.login(username, password);
    }
  }
}
