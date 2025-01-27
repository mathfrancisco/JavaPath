import { Component, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSliderModule} from '@angular/material/slider';
import {MatExpansionModule} from '@angular/material/expansion';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-curso-filtro',
  standalone: true,
  imports: [ CommonModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatSliderModule,
    MatCheckboxModule,
    MatRadioModule],
  templateUrl: './curso-filtro.component.html',
  styleUrl: './curso-filtro.component.css'
})
export class CursoFiltroComponent {
  @Output() filtersChanged = new EventEmitter<any>();
  filterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      level: [''],
      duration: [0],
      rating: [0],
      price: [0]
    });

    this.filterForm.valueChanges.subscribe(values => {
      this.filtersChanged.emit(values);
    });
  }
}
