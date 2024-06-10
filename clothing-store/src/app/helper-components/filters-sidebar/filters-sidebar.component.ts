import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProducerService } from 'src/app/services/producer.service';
import { Category } from 'src/models/category.model';
import { Producer } from 'src/models/producer.model';

@Component({
  selector: 'app-filters-sidebar',
  templateUrl: './filters-sidebar.component.html',
  styleUrls: ['./filters-sidebar.component.css']
})
export class FiltersSidebarComponent implements OnInit {
  categories: Category[] = [];
  producers: Producer[] = [];

  constructor(private categoryService: CategoryService,
    private producerService: ProducerService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getProducers();
  }

  getCategories(): void {
    this.categoryService
      .getAllCategories()
      .subscribe((category) => { this.categories = category });
  }

  getProducers(): void {
    this.producerService
      .getAllProducers()
      .subscribe((producer) => { this.producers = producer });
  }


}
