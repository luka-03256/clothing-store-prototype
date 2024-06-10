import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothesListComponent } from './clothes-list.component';

describe('ClothesListComponent', () => {
  let component: ClothesListComponent;
  let fixture: ComponentFixture<ClothesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClothesListComponent]
    });
    fixture = TestBed.createComponent(ClothesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
