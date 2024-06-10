import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  url!: string;
  currentUser!: User;
  cartItemsCount: number = 0;

  constructor(private router: Router,
    private cartService: CartService,
    private authenticationService: AuthenticationService,
    private modalService: NgbModal
  ) {
    this.authenticationService.user.subscribe(
      (user) => {
        this.currentUser = user;
      }
    );
  }

  ngOnInit(): void {
      this.router.events.subscribe((evt) => {
        if(evt instanceof NavigationEnd) {
          this.url = evt.url;
        }
      });
      this.cartItemsCount = this.cartService.cartItemLen;
      this.cartService.getCount().subscribe((count) => {
        this.cartItemsCount=count;
      });
  }


  openLoginModal(content: any) {
    this.modalService.open(content, {
      centered: true,
      windowClass: 'login-modal',
    });
  }


}
