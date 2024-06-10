import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Review } from 'src/models/review.model';

@Component({
  selector: 'app-review-modal-content',
  templateUrl: './review-modal-content.component.html',
  styleUrls: ['./review-modal-content.component.css']
})
export class ReviewModalContentComponent implements OnInit{
  @Input() review!: Review;
  
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
      //...
  }

  reviewModalDismiss(): void {
    this.modalService.dismissAll();
  }


}
