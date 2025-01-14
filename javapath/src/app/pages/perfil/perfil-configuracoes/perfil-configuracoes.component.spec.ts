import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilConfiguracoesComponent } from './perfil-configuracoes.component';

describe('PerfilConfiguracoesComponent', () => {
  let component: PerfilConfiguracoesComponent;
  let fixture: ComponentFixture<PerfilConfiguracoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilConfiguracoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilConfiguracoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
