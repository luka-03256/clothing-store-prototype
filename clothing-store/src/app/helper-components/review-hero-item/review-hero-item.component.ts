import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Review } from 'src/models/review.model';

@Component({
  selector: 'app-review-hero-item',
  templateUrl: './review-hero-item.component.html',
  styleUrls: ['./review-hero-item.component.css']
})
export class ReviewHeroItemComponent implements OnInit {
  @Input() review!: Review;

  constructor(private modalService: NgbModal) { }

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
