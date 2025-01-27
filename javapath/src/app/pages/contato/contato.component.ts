// contato.component.ts
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';

interface ContactForm {
  nome: string;
  email: string;
  mensagem: string;
}

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    FooterComponent,
    MatIconModule
  ],
  styleUrls: ['./contato.component.scss']
})
export class ContatoComponent {
  formData: ContactForm = {
    nome: '',
    email: '',
    mensagem: ''
  };

  horarios = {
    segundaSexta: '9h às 18h',
    sabado: '9h às 13h',
    domingo: 'Fechado'
  };

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form submitted:', this.formData);
      // Implement form submission logic here
    }
  }
}
