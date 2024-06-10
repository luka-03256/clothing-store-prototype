import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  user!: User;
  err!: string;

  login = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: NgbModal
  ) { }


  ngOnInit(): void {
    //...
  }


  onSubmit(evt: Event): void {
    const form = document.getElementById('login') as HTMLFormElement;

    // form is empty
    if (!form) {
      return;
    }

    const loginVal = this.login.value;

    let isValid = form.checkValidity();
    form.classList.add('was-validated');

    if (!isValid) {
      evt.preventDefault();
      evt.stopPropagation();
    } else {
      this.authenticationService
        .loginUser(loginVal.username, loginVal.email, loginVal.password)
        .subscribe({
          next: (response: any) => {
            this.login.reset();

            form.classList.remove('was-validated');

            this.loginModalDismiss();

            if (this.router.url === '/login') {
              this.router.navigate(['']);
            }
          },
          error: (error) => {
            this.err = error;
          },
        });
    }
  }

  loginModalDismiss(): void {
    this.modalService.dismissAll();
  }

}
