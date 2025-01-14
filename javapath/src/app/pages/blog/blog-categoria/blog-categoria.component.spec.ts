import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCategoriaComponent } from './blog-categoria.component';

describe('BlogCategoriaComponent', () => {
  let component: BlogCategoriaComponent;
  let fixture: ComponentFixture<BlogCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogCategoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
