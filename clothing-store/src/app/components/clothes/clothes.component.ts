import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClothesService } from 'src/app/services/clothes.service';
import { FilterService } from 'src/app/services/filter.service';
import { SharedService } from 'src/app/services/shared.service';
import { Clothes } from 'src/models/clothes.model';

@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.component.html',
  styleUrls: ['./clothes.component.css']
})
export class ClothesComponent implements OnInit, OnDestroy {
  clothes: Clothes[] = [];

  constructor(private route: ActivatedRoute,
    private clothesService: ClothesService,
    private sharedService: SharedService,
    private filterService: FilterService
  ) { }


  ngOnInit(): void {
    this.setAllClothes();

    this.filterService.filterChanged.subscribe((data: any) => {
      const filterURL = this.filterService.filterURL;
      this.getFilteredClothes(filterURL);
    });

    this.route.queryParamMap.subscribe((params) => {
      const filterURL = this.filterService.prepareFilterURL(params);
      this.getFilteredClothes(filterURL);
    });
  }

  ngOnDestroy(): void {
    this.sharedService.pageComponentDestroyed.emit({
      value: 'clothesComponent'
    });
  }

  setAllClothes(): void {
    this.route.data.subscribe((res) => {
      this.clothes = res['clothes'];
    });
  }


  getFilteredClothes(url: string): void {
    this.clothesService.getClothes(url).subscribe((clothes) => this.clothes = clothes);
  }



}