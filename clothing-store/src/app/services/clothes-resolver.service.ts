import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Clothes } from 'src/models/clothes.model';
import { ClothesService } from './clothes.service';

@Injectable({
  providedIn: 'root'
})
export class ClothesResolverService implements Resolve<any> {

  constructor(private clothesService: ClothesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<Clothes[]> {
    return this.clothesService.getAllClothes();
  }
}