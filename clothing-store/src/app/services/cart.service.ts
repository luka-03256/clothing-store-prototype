import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CartItem } from 'src/models/cart-item';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: CartItem[] = [];

  observable = new Subject();
  observable$ = this.observable.asObservable();

  constructor(private sharedService: SharedService) { }

  addItemToCart(item: CartItem) {
    if (this.itemInCart(item)) {
      this.sharedService.alertMsg.emit({
        message: 'This clothing item was already added in your cart',
        type: 'warning'
      });
    } else {
      this.items.push(item);
      this.saveCart();
      this.observable.next(this.items.length);
      this.sharedService.alertMsg.emit({
        message: 'Clothing item successfully added to your cart',
        type: 'success',
      });
    }
  }

  getItems() {
    return this.items;
  }


  clearCart() {
    this.items = [];
    localStorage.removeItem('cartItems');
    this.observable.next(0);
    return this.items;
  }

  saveCart(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }

  loadCart(): void {
    this.items = JSON.parse(localStorage.getItem('cartItems')!) ?? [];
  }

  removeItem(item: CartItem) {
    const index = this.items.findIndex((i) => i.clothingItem === item.clothingItem);
    if (index > -1) {
      this.items.splice(index, 1);
      // update cart after removing one item from it
      this.saveCart();
      // update cart lengt
      this.observable.next(this.items.length);
    }


    // if(index < 0) {
    //   if (index > -1) {
    //     throw new Error('array index out of bounds');
    //     this.items.splice(index, 1);
    //     this.saveCart();
    //     this.simpleObservable.next(this.items.length);
    //   }
    //   }
    //   this.items.splice(index,1);
    //   // update cart after removing one item from it
    //   this.saveCart();
    //   // update cart lengt
    //   this.observable.next(this.items.length);


  }

  itemInCart(item: CartItem): boolean {
    console.log('item looking for => ', item);
    console.log(this.items);
    return this.items.findIndex((i) => i.clothingItem.id === item.clothingItem.id) > -1;
  }

  getCount(): Observable<any> {
    return this.observable$;
  }

  get cartItemLen() {
    this.loadCart();
    return this.items.length;
  }

}
