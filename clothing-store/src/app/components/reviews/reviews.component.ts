import { Component, OnInit } from '@angular/core';
import { ReviewsService } from 'src/app/services/reviews.service';
import { Review } from 'src/models/review.model';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit{
  featuredReview!: Review;
  reviews: Review[] = [];

  constructor(private reviewsService: ReviewsService) { }

  ngOnInit(): void {
      this.getAllReviews();
  }


  getAllReviews(): void {
    this.reviewsService.getAllReviews().subscribe((reviews) => {
      this.featuredReview = reviews[0];
      this.reviews=reviews.slice(1,reviews.length);
    });
  }
}
