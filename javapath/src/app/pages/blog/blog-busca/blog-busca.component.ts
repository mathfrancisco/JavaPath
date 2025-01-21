import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlogService, Post } from './blog.service';
import { CardBlogComponent } from './card-blog.component';

@Component({
  selector: 'app-blog-busca',
  standalone: true,
  imports: [],
  templateUrl: './blog-busca.component.html',
  styleUrl: './blog-busca.component.css'
})
implements OnInit {
  posts: Post[] = [];
  searchTerm = '';
  availableTags: string[] = ['Java', 'Spring', 'Angular', 'TypeScript'];
  selectedTags: string[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.blogService
      .getPosts(this.searchTerm, this.selectedTags)
      .subscribe(posts => this.posts = posts);
  }

  onSearch() {
    this.loadPosts();
  }

  toggleTag(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index === -1) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags.splice(index, 1);
    }
    this.loadPosts();
  }
}
