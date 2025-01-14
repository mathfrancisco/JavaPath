// comment.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comment',
  template: `
    <div class="border rounded-md p-4 mb-4">
      <p class="font-bold">{{ comment.author }}</p>
      <p>{{ comment.content }}</p>

      <p class="text-gray-500 text-sm">{{ comment.date | date }}</p>
    </div>
  `,
  standalone: true,
  styles: []
})
export class CommentsComponent {
  @Input() comment: any; // Recebe um objeto de comentário como input


}
