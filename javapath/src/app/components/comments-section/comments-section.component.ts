// comments-section.component.ts
import { Component, Input } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {CommentComponent} from '../comments/comments.component';


@Component({
  selector: 'app-comments-section',
  templateUrl: './comments-section.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    CommentComponent
  ],

  styleUrls: ['./comments-section.component.scss']
})

@Input() postId!: string;
  comments: any[] = [];
  newComment = '';
  isAdmin = false; // Deve ser definido baseado no usuário atual

  constructor(private comentariosService: ComentariosService) {}

  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    this.comentariosService
      .findAllByPost(this.postId)
      .subscribe(comments => this.comments = comments);
  }

  addComment() {
    if (!this.newComment.trim()) return;

    this.comentariosService
      .create({
        conteudo: this.newComment,
        postId: this.postId
      })
      .subscribe(() => {
        this.newComment = '';
        this.loadComments();
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

  canEditComment(comment: any): boolean {
    // Implementar lógica de permissão
    return this.isAdmin || comment.author.id === 'current-user-id';
  }
}
