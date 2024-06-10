import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/models/cart-item';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @ViewChildren('subTotalWrap') subTotalItems!: QueryList<ElementRef>;
  private currency = 'EUR';

  items!: CartItem[];
  currentUser!: User;

  constructor(
    private authenticationService: AuthenticationService,
    private cartService: CartService
  ) {
    this.authenticationService.user.subscribe(
      (user) => (this.currentUser = user)
    );
  }

  ngOnInit(): void {
    this.cartService.loadCart();
    this.items = this.cartService.getItems();
  }

  //remove specific item from cart
  removeFromCart(item: CartItem) {
    this.cartService.removeItem(item);
    this.items = this.cartService.getItems();
  }

  //clear call items from cart
  clearCart(items: CartItem[]) {
    this.cartService.clearCart();
    this.items = [...this.cartService.getItems()];
  }

  get total() {
    return this.items
      .reduce(
        (sum, x) => ({
          quantity: 1,
          price: sum.price + x.quantity * x.clothingItem.price,
        }),
        { quantity: 1, price: 0 }
      )
      .price.toFixed(2);
  }

  get totalWithCurrency() {
    return `${this.total} ${this.currency}`;
  }

  changeSubtotal(item: CartItem, index: number) {
    const quantity = item.quantity;
    const amt = item.clothingItem.price;
    const subTotal = (amt * quantity).toFixed(2);
    const subTotalWithCurrency = `${subTotal} ${this.currency}`;

    this.subTotalItems.toArray()[index].nativeElement.innerHTML =
      subTotalWithCurrency;
    this.cartService.saveCart();
  }

}