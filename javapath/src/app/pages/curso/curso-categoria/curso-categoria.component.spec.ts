import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoCategoriaComponent } from './curso-categoria.component';

describe('CursoCategoriaComponent', () => {
  let component: CursoCategoriaComponent;
  let fixture: ComponentFixture<CursoCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoCategoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursoCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
