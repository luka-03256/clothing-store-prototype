import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ClothesService } from 'src/app/services/clothes.service';
import { ReviewsService } from 'src/app/services/reviews.service';
import { SharedService } from 'src/app/services/shared.service';
import { Clothes } from 'src/models/clothes.model';
import { CartItem } from 'src/models/cart-item';
import { Review } from 'src/models/review.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-clothes-details',
  templateUrl: './clothes-details.component.html',
  styleUrls: ['./clothes-details.component.css']
})
export class ClothesDetailsComponent implements OnInit, OnDestroy{
  id!: number;
  recommendedClothes: Clothes[] = [];
  reviews: Review[] = [];
  currency: string = 'EUR';

  @Input() clothingItem!: Clothes;

  constructor(
    private route: ActivatedRoute,
    private clothesService: ClothesService,
    private reviewsService: ReviewsService,
    private sharedService: SharedService,
    private cartService: CartService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +Number(params.get('id'));
      this.setClothingItem();
      this.getClothingItemReviews();
      this.getRecommendedClothes();
    });
  }

  ngOnDestroy(): void {
    this.sharedService.pageComponentDestroyed.emit({
      value: 'clothesDetailsComponent',
    });
  }

  setClothingItem(): void {
    this.route.data.subscribe((response) => (this.clothingItem = response['clothingItem']));
  }

  getRecommendedClothes(): void {
    this.clothesService
      .getRecommendedClothes(this.id, this.clothingItem.category.name)
      .subscribe((clothingItem) => (this.recommendedClothes = clothingItem));
  }

  getClothingItemReviews(): void {
    this.reviewsService
      .getClothingItemReviews(this.id)
      .subscribe((reviews) => (this.reviews = reviews));
  }

  goBack(): void {
    this.location.back();
  }

  addToCart(oneClothingItem: Clothes) {
    const item: CartItem = {
      clothingItem: oneClothingItem,
      quantity: 1
    };
    console.log('CART_ITEM: ', item);

    this.cartService.addItemToCart(item);
  }
}
