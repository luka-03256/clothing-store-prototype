import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothesListItemComponent } from './clothes-list-item.component';

describe('ClothesListItemComponent', () => {
  let component: ClothesListItemComponent;
  let fixture: ComponentFixture<ClothesListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClothesListItemComponent]
    });
    fixture = TestBed.createComponent(ClothesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
