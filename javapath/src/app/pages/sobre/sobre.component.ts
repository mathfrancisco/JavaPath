import { Component } from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {FooterComponent} from '../../components/footer/footer.component';

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [
    MatIcon,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './sobre.component.html',
  styleUrl: './sobre.component.css'
})
export class SobreComponent {

}
