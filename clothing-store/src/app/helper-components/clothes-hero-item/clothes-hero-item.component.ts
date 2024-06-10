import { Component, Input } from '@angular/core';
import { Clothes } from 'src/models/clothes.model';

@Component({
  selector: 'app-clothes-hero-item',
  templateUrl: './clothes-hero-item.component.html',
  styleUrls: ['./clothes-hero-item.component.css']
})
export class ClothesHeroItemComponent {
  @Input() clothingItem!: Clothes;

  constructor() {}

  ngOnInit(): void {}

  // reduce size of text you want to display
  truncate(string: string, length: number, end: string = '...') {
    return string.length < length ? string : string.substring(0, length) + end;
  }
}
