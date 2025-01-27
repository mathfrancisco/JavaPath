import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoFiltroComponent } from './curso-filtro.component';

describe('CursoFiltroComponent', () => {
  let component: CursoFiltroComponent;
  let fixture: ComponentFixture<CursoFiltroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoFiltroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursoFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
