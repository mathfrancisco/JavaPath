import { Component } from '@angular/core';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {FooterComponent} from '../../components/footer/footer.component';
import {NavbarComponent} from '../../components/navbar/navbar.component';

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

interface Value {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [
    MatIcon,
    NavbarComponent,
    FooterComponent,
    MatIcon,
    FooterComponent,
    NavbarComponent
  ],
  templateUrl: './sobre.component.html',
  styleUrl: './sobre.component.css'
})
export class SobreComponent {
  teamMembers: TeamMember[] = [
    {
      name: 'João Silva',
      role: 'Desenvolvedor Full Stack',
      image: '/assets/images/team/member1.jpg'
    },
    {
      name: 'Maria Souza',
      role: 'Designer de UX/UI',
      image: '/assets/images/team/member2.jpg'
    },
    {
      name: 'Carlos Santos',
      role: 'Gerente de Projetos',
      image: '/assets/images/team/member3.jpg'
    }
  ];

  values: Value[] = [
    {
      icon: 'school',
      title: 'Educação de Qualidade',
      description: 'Nosso compromisso é oferecer conteúdos de alta qualidade para todos os nossos usuários.'
    },
    {
      icon: 'group',
      title: 'Comunidade',
      description: 'Acreditamos no poder da colaboração e no aprendizado em grupo.'
    },
    {
      icon: 'trending_up',
      title: 'Crescimento Contínuo',
      description: 'Estamos sempre evoluindo para atender às necessidades dos nossos usuários.'
    }
  ];


}
