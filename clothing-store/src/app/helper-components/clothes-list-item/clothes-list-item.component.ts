import { Component, Input, OnInit } from '@angular/core';
import { Clothes } from 'src/models/clothes.model';

@Component({
  selector: 'app-clothes-list-item',
  templateUrl: './clothes-list-item.component.html',
  styleUrls: ['./clothes-list-item.component.css']
})
export class ClothesListItemComponent implements OnInit {
  currency: string = 'EUR';
  @Input() clothingItem!: Clothes;
  
  constructor() { }

  ngOnInit(): void {
      //
  }


}
