import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoBuscaAvancadaComponent } from './curso-busca-avancada.component';

describe('CursoBuscaAvancadaComponent', () => {
  let component: CursoBuscaAvancadaComponent;
  let fixture: ComponentFixture<CursoBuscaAvancadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoBuscaAvancadaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursoBuscaAvancadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
