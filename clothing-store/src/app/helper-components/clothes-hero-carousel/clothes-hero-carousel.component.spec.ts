import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothesHeroCarouselComponent } from './clothes-hero-carousel.component';

describe('ClothesHeroCarouselComponent', () => {
  let component: ClothesHeroCarouselComponent;
  let fixture: ComponentFixture<ClothesHeroCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClothesHeroCarouselComponent]
    });
    fixture = TestBed.createComponent(ClothesHeroCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
