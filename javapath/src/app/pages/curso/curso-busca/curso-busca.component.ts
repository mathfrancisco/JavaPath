import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-curso-busca',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule],
  templateUrl: './curso-busca.component.html',
  styleUrl: './curso-busca.component.css'
})
export class CourseSearchComponent {
  @Output() searchChange = new EventEmitter<string>();
  @Output() categoryChange = new EventEmitter<string>();

  searchTerm = '';
  selectedCategory = '';
  categories = [
    { id: 'java-basics', name: 'Java Basics' },
    { id: 'spring-framework', name: 'Spring Framework' },
    { id: 'web-development', name: 'Web Development' },
    { id: 'data-structures', name: 'Data Structures' }
  ];

  onSearchChange() {
    this.searchChange.emit(this.searchTerm);
  }

  onCategoryChange() {
    this.categoryChange.emit(this.selectedCategory);
  }
}
