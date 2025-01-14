import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoBuscaComponent } from './curso-busca.component';

describe('CursoBuscaComponent', () => {
  let component: CursoBuscaComponent;
  let fixture: ComponentFixture<CursoBuscaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoBuscaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursoBuscaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
