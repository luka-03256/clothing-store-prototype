import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Review } from 'src/models/review.model';

@Component({
  selector: 'app-reviews-list-item',
  templateUrl: './reviews-list-item.component.html',
  styleUrls: ['./reviews-list-item.component.css']
})
export class ReviewsListItemComponent implements OnInit{
  @Input() review!: Review;

  constructor (private modalService: NgbModal) { }

  ngOnInit(): void {
      //...
  }

  openReviewModal(evt: Event, content: any) {
    evt.preventDefault();
    this.modalService.open(content, {
      centered: true,
      windowClass: 'review-modal',
    });
  }
}
