import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import {CommonModule} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {MatIcon} from '@angular/material/icon';
import {CourseSearchService} from '../../../services/curso-search.service';

@Component({
  selector: 'app-curso-busca-avancada',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatChipsModule,
    MatFormFieldModule, MatIcon],
  templateUrl: './curso-busca-avancada.component.html',
  styleUrl: './curso-busca-avancada.component.css'
})
export class CursoBuscaAvancadaComponent implements OnInit{
  searchControl = new FormControl('');
  recentSearches: string[] = [];
  searchSuggestions: string[] = [];
  activeFilters: any[] = [];
  hasActiveFilters: boolean = false;

  constructor(
    private searchService: CourseSearchService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Inscreve-se nas buscas recentes
    this.searchService.getRecentSearches()
      .subscribe(searches => this.recentSearches = searches);

    // Configura autocomplete
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      if (term) {
        this.searchService.search(term);
      }
    });

    // Recupera filtros da URL
    this.route.queryParams.subscribe(params => {
      this.updateActiveFilters(params);
    });
  }

  search(term: string) {
    this.searchControl.setValue(term);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: term },
      queryParamsHandling: 'merge'
    });
  }

  removeRecentSearch(term: string) {
    this.recentSearches = this.recentSearches.filter(t => t !== term);
    // Atualiza localStorage
  }

  removeFilter(filter: any) {
    const queryParams = { ...this.route.snapshot.queryParams };
    delete queryParams[filter.key];
    this.router.navigate([], { queryParams });
  }

  private updateActiveFilters(params: any) {
    this.activeFilters = Object.entries(params)
      .filter(([key]) => key !== 'q')
      .map(([key, value]) => ({
        key,
        label: this.getFilterLabel(key),
        value
      }));
    this.hasActiveFilters = this.activeFilters.length > 0;
  }

  private getFilterLabel(key: string) {
    switch (key) {
      case 'level':
        return 'Nível';
      case 'price':
        return 'Preço';
      case 'duration':
        return 'Duração';
      default:
        return key;
    }
  }
}
