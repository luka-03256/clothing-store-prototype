import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewModalContentComponent } from './review-modal-content.component';

describe('ReviewModalContentComponent', () => {
  let component: ReviewModalContentComponent;
  let fixture: ComponentFixture<ReviewModalContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewModalContentComponent]
    });
    fixture = TestBed.createComponent(ReviewModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
