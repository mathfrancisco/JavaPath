// comments-section.component.ts
import { Component, Input } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {CommentsComponent} from '../comments/comments.component';

@Component({
  selector: 'app-comments-section',
  templateUrl: './comments-section.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    CommentsComponent
  ],

  styleUrls: ['./comments-section.component.scss']
})

export class CommentsSectionComponent {
  @Input() comments: any[] = [];
  @Input() itemId: number = 0; // Id do curso ou do post
  newComment = { author: '', content: '' };


  constructor() { }



  addComment() {
    let comments = localStorage.getItem(`comments-${this.itemId}`)

    if (!comments) {
      localStorage.setItem(`comments-${this.itemId}`, JSON.stringify([this.newComment]))
    } else {
      localStorage.setItem(`comments-${this.itemId}`, JSON.stringify([...JSON.parse(comments), this.newComment]))
    }


    if (this.newComment.author !== '' || this.newComment.content !== '') {
      this.comments.push({
        author: this.newComment.author,
        content: this.newComment.content,

        date: new Date()
      });

      this.newComment = { author: '', content: '' }; // Limpa o formulário
    }
  }



  ngOnInit(): void {
    let comments = localStorage.getItem(`comments-${this.itemId}`)
    this.comments = comments ? JSON.parse(comments) : []

  }
}

