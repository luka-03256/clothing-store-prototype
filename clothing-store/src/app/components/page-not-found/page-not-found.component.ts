import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit, OnDestroy{

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
      //...
  }

  ngOnDestroy(): void {
      this.sharedService.pageComponentDestroyed.emit({
        value: 'pageNotFoundComponent',
      })
  }
  
  
}
