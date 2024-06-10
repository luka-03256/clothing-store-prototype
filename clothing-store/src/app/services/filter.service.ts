import { EventEmitter, Injectable, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Clothes } from 'src/models/clothes.model';
import { SharedService } from './shared.service';
import { ClothesService } from './clothes.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  @Output() public filterChanged: EventEmitter<any> = new EventEmitter();
  private filterParameters: any = {};
  private filterItems: any = [];

  filterURL: string = '';
  clothes: Clothes[] = [];

  constructor(private route: ActivatedRoute,
    private sharedService: SharedService,
    private router: Router,
    private clothesService: ClothesService) {
    this.filterClothesFromRoute();
    this.filterClothesOnChkBoxChange();
  }

  filterClothesFromRoute(): void {
    const queryParams = this.route.snapshot.queryParams;

    Object.keys(queryParams).forEach((key: string) => {
      const filterValues = queryParams[key].split('+');

      filterValues.forEach((value: string) => {
        this.filterItems.push({
          type: key,
          value: value,
          isActive: true,
        });
      });
    });

    this.sharedService.pageComponentDestroyed.subscribe((data: any) => {
      if (data.value === 'searchComponent') {
        this.filterItems = [];
      } else {
        this.filterItems = this.filterItems.filter(
          (item: any) => item.type === 'term'
        );
      }
    });

    this.sharedService.searchChanged.subscribe((data: any) => {
      this.filterItems = [];
      this.filterItems.push({
        type: data.type,
        value: data.value,
        isActive: true,
      });
    });
  }

  filterClothesOnChkBoxChange(): void {
    this.filterChanged.subscribe((data: any) => {
      if (data.isActive) {
        this.filterItems.push(data);
      } else {
        this.filterItems = this.filterItems.filter(
          (item: any) => !(item.type === data.type && item.value === data.value)
        );
      }
      this.filterParameters = this.prepareFilterParams(this.filterItems);
      this.filterURL = this.prepareFilterURL(this.filterParameters);

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: this.filterParameters,
        queryParamsHandling: ''
      });
    });
  }

  prepareFilterParams(filterItems: any): any {
    let queryParams: any = {};

    filterItems.map((filterItem: any) => {
      if (queryParams[filterItem.type]) {
        queryParams[filterItem.type] = `${queryParams[filterItem.type]}+${filterItem.value}`;
      } else {
        queryParams[filterItem.type] = filterItem.value;
      }
    });
    return queryParams;
  }

  prepareFilterURL(filterParameters: any): string {
    let filterTerm = filterParameters['term'];
    let filterCategories = filterParameters['category'];
    let filterProducers = filterParameters['producer'];
    let apiURL = 'api/clothes';
    let filterPath = '';

    if (filterTerm) {
      filterPath += `title_like=${filterTerm}&`;
    }

    if (filterCategories) {
      filterCategories = filterCategories.split('+');
      filterCategories.map((categoryFilter: string) => {
        filterPath += `category.id=${categoryFilter}&`;
      });
    }

    if (filterProducers) {
      filterProducers = filterProducers.split('+');
      filterProducers.map((producerFilter: string) => {
        filterPath += `producer.id=${producerFilter}&`;
      });
    }

    return `${apiURL}?${filterPath}`;

  }

}
