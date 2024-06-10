import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsListItemComponent } from './reviews-list-item.component';

describe('ReviewsListItemComponent', () => {
  let component: ReviewsListItemComponent;
  let fixture: ComponentFixture<ReviewsListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewsListItemComponent]
    });
    fixture = TestBed.createComponent(ReviewsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
