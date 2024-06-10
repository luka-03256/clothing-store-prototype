import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersListItemComponent } from './filters-list-item.component';

describe('FiltersListItemComponent', () => {
  let component: FiltersListItemComponent;
  let fixture: ComponentFixture<FiltersListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltersListItemComponent]
    });
    fixture = TestBed.createComponent(FiltersListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
