import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsThumbListComponent } from './reviews-thumb-list.component';

describe('ReviewsThumbListComponent', () => {
  let component: ReviewsThumbListComponent;
  let fixture: ComponentFixture<ReviewsThumbListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewsThumbListComponent]
    });
    fixture = TestBed.createComponent(ReviewsThumbListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
