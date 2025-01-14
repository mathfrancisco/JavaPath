import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogBuscaComponent } from './blog-busca.component';

describe('BlogBuscaComponent', () => {
  let component: BlogBuscaComponent;
  let fixture: ComponentFixture<BlogBuscaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogBuscaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogBuscaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
