import { Component, Input } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { config } from 'rxjs';
import { Clothes } from 'src/models/clothes.model';

@Component({
  selector: 'app-clothes-hero-carousel',
  templateUrl: './clothes-hero-carousel.component.html',
  styleUrls: ['./clothes-hero-carousel.component.css']
})
export class ClothesHeroCarouselComponent {
  @Input() clothingItem: Clothes[] = [];

	constructor(configuration: NgbCarouselConfig) {
		// customize default values of carousels used by this component tree
		configuration.interval = 4000;
		configuration.wrap = true;
		configuration.keyboard = false;
		configuration.pauseOnHover = false;
	}

  ngOnInit(): void {}
}
