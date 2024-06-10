import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewHeroItemComponent } from './review-hero-item.component';

describe('ReviewHeroItemComponent', () => {
  let component: ReviewHeroItemComponent;
  let fixture: ComponentFixture<ReviewHeroItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewHeroItemComponent]
    });
    fixture = TestBed.createComponent(ReviewHeroItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
