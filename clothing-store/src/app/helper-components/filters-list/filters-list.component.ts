import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/models/category.model';
import { Producer } from 'src/models/producer.model';

@Component({
  selector: 'app-filters-list',
  templateUrl: './filters-list.component.html',
  styleUrls: ['./filters-list.component.css']
})
export class FiltersListComponent implements OnInit {
  @Input() type!: string;
  @Input() filterItems: Category[] | Producer[] = [];

  title!: string;

  constructor() { }

  ngOnInit(): void {
    this.setTitle();
  }

  setTitle(): void {
    if (this.type === 'category') {
      this.title = 'Categories';
    } else if (this.type === 'producer') {
      this.title = 'Producers';
    } else {
      this.title = '';
    }
  }
}
