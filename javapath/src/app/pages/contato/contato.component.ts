// contato.component.ts
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  standalone: true,
  styleUrls: ['./contato.component.scss']
})
export class ContatoComponent {

  onSubmit(form: NgForm) {
    if (form.valid) {
      // Lógica para enviar os dados do formulário (ex: para um backend)
      console.log('Formulário enviado:', form.value);


      // Limpar o formulário
      form.resetForm();
    }
  }
}
