// contato.component.ts
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface ContatoForm {
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
    FormsModule
  ],
  styleUrls: ['./contato.component.scss']
})
export class ContatoComponent {
  formData: ContatoForm = {
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
      // Implementar lógica de envio do formulário
    }
  }
}