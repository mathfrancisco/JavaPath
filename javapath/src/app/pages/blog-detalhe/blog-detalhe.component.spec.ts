import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDetalheComponent } from './blog-detalhe.component';

describe('BlogDetalheComponent', () => {
  let component: BlogDetalheComponent;
  let fixture: ComponentFixture<BlogDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogDetalheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
