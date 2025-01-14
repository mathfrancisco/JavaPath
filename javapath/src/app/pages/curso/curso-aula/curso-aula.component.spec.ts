import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoAulaComponent } from './curso-aula.component';

describe('CursoAulaComponent', () => {
  let component: CursoAulaComponent;
  let fixture: ComponentFixture<CursoAulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoAulaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursoAulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
