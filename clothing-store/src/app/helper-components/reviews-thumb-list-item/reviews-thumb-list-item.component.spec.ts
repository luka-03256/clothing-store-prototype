import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsThumbListItemComponent } from './reviews-thumb-list-item.component';

describe('ReviewsThumbListItemComponent', () => {
  let component: ReviewsThumbListItemComponent;
  let fixture: ComponentFixture<ReviewsThumbListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewsThumbListItemComponent]
    });
    fixture = TestBed.createComponent(ReviewsThumbListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
