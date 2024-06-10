import { Component, Input, OnInit } from '@angular/core';
import { Review } from 'src/models/review.model';

@Component({
  selector: 'app-reviews-thumb-list',
  templateUrl: './reviews-thumb-list.component.html',
  styleUrls: ['./reviews-thumb-list.component.css']
})
export class ReviewsThumbListComponent implements OnInit {
  @Input() reviews: Review[] = [];

  constructor() { }

  ngOnInit(): void {
    //...
  }

}
