import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothesHeroItemComponent } from './clothes-hero-item.component';

describe('ClothesHeroItemComponent', () => {
  let component: ClothesHeroItemComponent;
  let fixture: ComponentFixture<ClothesHeroItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClothesHeroItemComponent]
    });
    fixture = TestBed.createComponent(ClothesHeroItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
