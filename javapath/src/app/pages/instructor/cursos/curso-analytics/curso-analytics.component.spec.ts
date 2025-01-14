import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoAnalyticsComponent } from './curso-analytics.component';

describe('CursoAnalyticsComponent', () => {
  let component: CursoAnalyticsComponent;
  let fixture: ComponentFixture<CursoAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoAnalyticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursoAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
