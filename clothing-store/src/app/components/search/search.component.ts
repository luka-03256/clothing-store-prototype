import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClothesService } from 'src/app/services/clothes.service';
import { FilterService } from 'src/app/services/filter.service';
import { SharedService } from 'src/app/services/shared.service';
import { Clothes } from 'src/models/clothes.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy{
  searchTerm!: string;
  clothes: Clothes[] = [];

  constructor(private route: ActivatedRoute,
    private clothesService: ClothesService,
    private sharedService: SharedService,
    private filterService: FilterService,
    private location: Location
  ) { }

  ngOnInit(): void {
      this.setSearchClothes();

      this.filterService.filterChanged.subscribe((data: any) => {
        const filterURL = this.filterService.filterURL;
        this.getFilteredClothes(this.filterService.filterURL);
      });

      this.route.queryParams.subscribe((params) => {
        const filterURL = this.filterService.prepareFilterURL(params);
        this.getFilteredClothes(filterURL);
      })

  }

  ngOnDestroy(): void {
      this.sharedService.pageComponentDestroyed.emit({
        value: 'searchComponent',
      });
  }

  setSearchClothes(): void {
    this.route.data.subscribe((resp) => {
      this.clothes = resp['clothes'];
    });
  }

  getFilteredClothes(url: string): void {
    this.clothesService.getClothes(url).subscribe((clothes) => {
      this.clothes = clothes
    });
  }


}
