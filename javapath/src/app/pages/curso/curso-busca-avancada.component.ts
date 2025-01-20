import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseSearchService } from './curso-search.service';

@Component({
  selector: 'app-curso-busca-avancada',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatChipsModule,
    MatFormFieldModule
  ],
  template: `
    <div class="search-container p-4">
      <!-- Barra de busca principal -->
      <mat-form-field class="w-full">
        <mat-label>Buscar cursos</mat-label>
        <input matInput
               [formControl]="searchControl"
               [matAutocomplete]="auto"
               placeholder="Digite para buscar...">
        <mat-icon matSuffix>search</mat-icon>
        
        <mat-autocomplete #auto="matAutocomplete">
          <mat-option *ngFor="let suggestion of searchSuggestions" 
                     [value]="suggestion">
            {{suggestion}}
          </mat-option>
        </mat-autocomplete>
      </mat-form-field>

      <!-- Buscas recentes -->
      <div class="recent-searches mt-2" *ngIf="recentSearches.length">
        <small class="text-gray-600">Buscas recentes:</small>
        <mat-chip-list>
          <mat-chip *ngFor="let term of recentSearches"
                   (click)="search(term)"
                   removable="true"
                   (removed)="removeRecentSearch(term)">
            {{term}}
            <mat-icon matChipRemove>cancel</mat-icon>
          </mat-chip>
        </mat-chip-list>
      </div>

      <!-- Filtros ativos -->
      <div class="active-filters mt-4" *ngIf="hasActiveFilters">
        <small class="text-gray-600">Filtros ativos:</small>
        <mat-chip-list>
          <mat-chip *ngFor="let filter of activeFilters"
                   (removed)="removeFilter(filter)">
            {{filter.label}}: {{filter.value}}
            <mat-icon matChipRemove>cancel</mat-icon>
          </mat-chip>
        </mat-chip-list>
      </div>
    </div>
  `
})
export class CursoBuscaAvancadaComponent implements OnInit {
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
