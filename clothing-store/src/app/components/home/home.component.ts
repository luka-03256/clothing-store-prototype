import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClothesService } from 'src/app/services/clothes.service';
import { SharedService } from 'src/app/services/shared.service';
import { Clothes } from 'src/models/clothes.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  featuredClothes: Clothes[] = [];
  popularClothes: Clothes[] = [];
  recentClothes: Clothes[] = [];
  recommendedClothes: Clothes[] = [];

  constructor(private clothesService: ClothesService,
    private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getFeaturedClothes();
    this.getPopularClothes();
    this.getRecentClothes();
    this.getRecommendedClothes();
  }

  ngOnDestroy(): void {
    this.sharedService.pageComponentDestroyed.emit({
      value: 'homeCmponent',
    });
  }

  getFeaturedClothes(): void {
    this.clothesService.getFeaturedClothes().subscribe((featured) => {
      this.featuredClothes = featured;
    })
  }

  getPopularClothes(): void {
    this.clothesService.getPopularClothes().subscribe((popularClothes) => {
      this.popularClothes = popularClothes
    });
  }

  getRecentClothes(): void {
    this.clothesService.getRecentClothes().subscribe((recentClothes) => {
      this.recentClothes = recentClothes
    });
  }

  getRecommendedClothes(): void {
    this.clothesService.getRecommendedClothes().subscribe((recommendedClothes) => {
      this.recommendedClothes = recommendedClothes
    });
  }


}
