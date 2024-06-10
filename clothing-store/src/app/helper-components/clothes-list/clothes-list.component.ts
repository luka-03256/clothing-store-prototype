import { Component, Input, OnInit } from '@angular/core';
import { Clothes } from 'src/models/clothes.model';

@Component({
  selector: 'app-clothes-list',
  templateUrl: './clothes-list.component.html',
  styleUrls: ['./clothes-list.component.css']
})
export class ClothesListComponent implements OnInit{
    @Input() clothes: Clothes[] = [];
    @Input() title!: string;

    constructor() {}
    
    ngOnInit(): void {
        //
    }
}
