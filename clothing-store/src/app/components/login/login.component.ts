import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  notificationMsg!: string;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation) {
      const state = navigation.extras.state as { notifyMsg: string };
      if (state) {
        this.notificationMsg = state.notifyMsg;
      }
    }
  }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

}
