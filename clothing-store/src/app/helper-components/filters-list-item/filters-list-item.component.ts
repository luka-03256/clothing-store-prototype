import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterService } from 'src/app/services/filter.service';
import { SharedService } from 'src/app/services/shared.service';
import { Category } from 'src/models/category.model';
import { Producer } from 'src/models/producer.model';

@Component({
  selector: 'app-filters-list-item',
  templateUrl: './filters-list-item.component.html',
  styleUrls: ['./filters-list-item.component.css']
})
export class FiltersListItemComponent implements OnInit {
  @Input() type!: string;
  @Input() checked: boolean = false;
  @Input() filterItem!: Category | Producer;

  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private filterService: FilterService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params[this.type]) {
        const ids = params[this.type].split('+');
        this.checked = ids.includes(String(this.filterItem.id));
      }
    });

    this.sharedService.searchChanged.subscribe((data: any) => {
      this.checked = false;
    });
  }

  handleFilterChange(e: any) {
    const filterCheckbox = e.target;

    this.filterService.filterChanged.emit({
      type: this.type,
      value: filterCheckbox.value,
      isActive: filterCheckbox.checked,
    });
  }
}
