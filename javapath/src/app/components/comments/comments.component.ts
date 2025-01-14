// comment.component.ts
import { Component, Input } from '@angular/core';
import {DatePipe, NgIf} from '@angular/common';

interface Comment {
  author: string;
  content: string;
  date: Date;
}

@Component({
  selector: 'app-comment',
  template: `
    <div class="border rounded-md p-4 mb-4" *ngIf="comment">
      <p class="font-bold">{{ comment.author }}</p>
      <p>{{ comment.content }}</p>
      <p class="text-gray-500 text-sm">{{ comment.date | date }}</p>
    </div>
  `,
  standalone: true,
  imports: [DatePipe, NgIf],
  styles: []
})
export class CommentComponent {
  @Input() comment: Comment | undefined;
}
