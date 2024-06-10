import { Injectable } from '@angular/core';
import { ClothesService } from './clothes.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Clothes } from 'src/models/clothes.model';

@Injectable({
  providedIn: 'root'
})
export class ClothesDetailsResolverService implements Resolve<any> {

  constructor(private clothesService: ClothesService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  :Observable<Clothes> {
    return this.clothesService.getClothingItemNo404(route.params['id']);
  }
}
