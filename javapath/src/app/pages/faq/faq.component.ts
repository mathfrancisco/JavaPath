// faq.component.ts
import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import {MatIcon} from '@angular/material/icon';
import {NgClass, NgForOf, NgIf} from '@angular/common';

interface FAQ {
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0, height: 0}),
        animate('300ms ease-out', style({opacity: 1, height: '*'})),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({opacity: 0, height: 0})),
      ]),
    ]),
  ],
  imports: [
    MatIcon,
    NgClass,
    NgIf,
    NgForOf
  ],
  standalone: true
})
export class FaqComponent {
  faqs: FAQ[] = [
    {
      question: 'Como posso me inscrever em um curso?',
      answer: 'Você pode se inscrever em um curso navegando até a página de cursos e clicando no botão "Inscrever-se".',
      isOpen: false,
    },
    {
      question: 'Quais são os métodos de pagamento aceitos?',
      answer: 'Aceitamos cartões de crédito, débito e PayPal.',
      isOpen: false,
    },
    {
      question: 'Posso acessar os cursos offline?',
      answer: 'Sim, você pode baixar as aulas para assistir offline após se inscrever em um curso.',
      isOpen: false,
    },
    {
      question: 'Há algum requisito prévio para os cursos?',
      answer: 'Alguns cursos podem ter pré-requisitos, que são mencionados na descrição do curso.',
      isOpen: false,
    },
    {
      question: 'Como posso entrar em contato com o suporte?',
      answer: 'Você pode entrar em contato com o suporte através do nosso formulário de contato ou pelo email suporte@javapath.com.',
      isOpen: false,
    },
  ];

  toggleFAQ(faq: FAQ): void {
    faq.isOpen = !faq.isOpen;
  }
}
