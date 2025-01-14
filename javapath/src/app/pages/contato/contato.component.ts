// contato.component.ts
import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./contato.component.scss']
})
export class ContatoComponent {
  private form: any;

  onSubmit() { // Update method signature
    console.log("Form submitted:", this.form.value);
  }
}
