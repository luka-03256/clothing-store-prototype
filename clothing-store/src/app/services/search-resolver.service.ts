import { Injectable } from '@angular/core';
import { ClothesService } from './clothes.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Clothes } from 'src/models/clothes.model';

@Injectable({
  providedIn: 'root'
})
export class SearchResolverService implements Resolve<any>{

  constructor(private clothesService: ClothesService) { }

  resolve(route: ActivatedRouteSnapshot,routerState: RouterStateSnapshot)
  :Observable<Clothes[]> {
    return this.clothesService.getSearchClothes(route.queryParams['term']);
  }
}
