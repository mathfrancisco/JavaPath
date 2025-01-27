import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import { ComentariosService } from '../../services/comentarios.service'; // Serviço para lidar com comentários

@Component({
  selector: 'app-comments-section',
  templateUrl: './comments-section.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    DatePipe,
    NgIf
  ],
  styleUrls: ['./comments-section.component.scss']
})
export class CommentsSectionComponent implements OnInit {
  @Input() postId!: string; // ID do post para associar os comentários
  @Input() comments!: any[] // Lista de comentários
  newComment = ''; // Novo comentário a ser adicionado
  isAdmin = false; // Deve ser definido com base no usuário atual

  constructor(private comentariosService: ComentariosService) {}

  ngOnInit() {
    this.loadComments(); // Carrega os comentários ao inicializar o componente
  }

  // Carrega os comentários do post
  loadComments() {
    this.comentariosService
      .findAllByPost(this.postId)
      .subscribe(comments => (this.comments = comments));
  }

  // Adiciona um novo comentário
  addComment() {
    if (!this.newComment.trim()) return; // Evita comentários vazios

    this.comentariosService
      .create({
        conteudo: this.newComment,
        postId: this.postId
      })
      .subscribe(() => {
        this.newComment = ''; // Limpa o campo de entrada
        this.loadComments(); // Recarrega os comentários
      });
  }


  moderateComment(id: string, approved: boolean) {
    this.comentariosService
      .moderate(id, approved)
      .subscribe(() => this.loadComments());
  }


  deleteComment(id: string) {
    this.comentariosService
      .remove(id)
      .subscribe(() => this.loadComments());
  }

  // Verifica se o usuário pode editar ou excluir o comentário
  @Input() itemId!: number;
  
  canEditComment(comment: any): boolean {
    // Implementa lógica de permissão
    return this.isAdmin || comment.author.id === 'current-user-id';
  }
}
