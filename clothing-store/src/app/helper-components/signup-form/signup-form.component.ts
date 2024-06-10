import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  // user!: User;

  // emailRegex: string = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";

  // signupForm = this.formBuilder.group({
  //   firstName: ['', [Validators.required, Validators.pattern("^[A-Z]{1}[a-z]{2,}$")]],
  //   lastName: ['', [Validators.required, Validators.pattern("^[A-Z]{1}[a-z]{2,}$")]],
  //   email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
  //   phoneNumber: ['', [Validators.required, Validators.pattern("/^06[0-9]{1}\-[0-9]{3}\-[0-9]{4}$/")]],
  //   username: ['', [Validators.required, Validators.pattern("^[A-Z]?[a-z]{2,}$")]],
  //   password: ['', [Validators.required, Validators.pattern("^([A-Za-z0-9]+)+"), Validators.minLength(5), Validators.maxLength(20)]],
  //   passwordConfirmation: ['', [Validators.required, Validators.pattern("^([A-Za-z0-9]+)+"), Validators.minLength(5), Validators.maxLength(20)]]
  // });

  // constructor(
  //   private authService: AuthenticationService,
  //   private formBuilder: FormBuilder,
  //   private router: Router,
  // ) { }

  // ngOnInit(): void {
  //   //throw new Error('Method not implemented.');
  // }

  // onSubmit(evt: Event): void {
  //   const form = document.getElementById('signup') as HTMLFormElement;
  //   console.log(form);
  //   if (!form) {
  //     return;
  //   }

  //   const passwordConfirmInput = document.getElementById('signupPasswordConfirmation') as HTMLInputElement;
  //   const signupFormValues = this.signupForm.value;

  //   console.log('PasswordConfirmation ', passwordConfirmInput);

  //   // match found 1; else 0
  //   // const passwordMathes = (signupFormValues.password ===
  //   //    signupFormValues.passwordConfirmation) ? 1 : 0;
  //   const passwordMatches = signupFormValues.password ===
  //     signupFormValues.passwordConfirmation;


  //   if (passwordMatches) {
  //     passwordConfirmInput.setCustomValidity('');
  //     passwordConfirmInput.reportValidity();
  //   }

  //   let isValid = form.checkValidity();

  //   if (isValid && !passwordMatches) {
  //     isValid = false;
  //     passwordConfirmInput.setCustomValidity(
  //       'Confirmation password field does not match with given password'
  //     );
  //   }
  //   form.classList.add('validated');

  //   if (!isValid) {
  //     evt.preventDefault();
  //     evt.stopPropagation();
  //   } else {
  //     const { firstName, lastName, email, phoneNumber, username, password } = signupFormValues;
  //     const user = { firstName, lastName, email, phoneNumber, username, password } as User;

  //     this.authService.registerUser(user).subscribe((res: any) => {
  //       this.user = res.user;
  //       console.log(res);
  //     });
  //     this.signupForm.reset();
  //     form.classList.remove('validated');
  //     const navigationExtras: NavigationExtras = {
  //       state: {
  //         notificationMsg: 'User successfully created. Now login as registered user'
  //       }
  //     };
  //     this.router.navigate(['/login'], navigationExtras);
  //   }


  // }



  user!: User;

  emailRegex: string = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";


  signupForm = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.pattern("^[A-Z]{1}[a-z]{2,}$")]],
    lastName: ['', [Validators.required, Validators.pattern("^[A-Z]{1}[a-z]{2,}$")]],
    address: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
    phoneNumber: ['', [Validators.required, Validators.pattern("/^06[0-9]{1}\-[0-9]{3}\-[0-9]{4}$/")]],
    username: ['', [Validators.required, Validators.pattern("^[A-Z]?[a-z]{2,}$")]],
    password: ['', [Validators.required, Validators.pattern("^([A-Za-z0-9]+)+"), Validators.minLength(5), Validators.maxLength(20)]],
    passwordConfirmation: ['', [Validators.required, Validators.pattern("^([A-Za-z0-9]+)+"), Validators.minLength(5), Validators.maxLength(20)]]
  });

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void { }

  onSubmit(e: Event): void {
    const form = document.getElementById('signup') as HTMLFormElement;

    if (!form) {
      return;
    }

    const passwordConfirmationInput = document.getElementById(
      'signupPasswordConfirmation'
    ) as HTMLInputElement;
    const userValues = this.signupForm.value;

    const passwordMatch =
      userValues.password === userValues.passwordConfirmation;

    if (userValues.password && passwordMatch) {
      passwordConfirmationInput.setCustomValidity('');
      passwordConfirmationInput.reportValidity();
    }

    let isValid = form.checkValidity();

    if (isValid && !passwordMatch) {
      isValid = false;
      passwordConfirmationInput.setCustomValidity(
        'The password confirmation does not match'
      );
    }

    form.classList.add('was-validated');

    if (!isValid) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      const { firstName, lastName, address, email, phoneNumber, username, password  } = userValues;
      const user = { firstName, lastName, address, email, phoneNumber, username, password } as User;

      this.authenticationService.registerUser(user).subscribe((response: any) => {
        this.user = response.user;
      });

      this.signupForm.reset();
      form.classList.remove('was-validated');

      const navigationExtras: NavigationExtras = {
        state: {
          notificationMessage: 'User successfully created. Please login now.',
        },
      };
      this.router.navigate(['/login'], navigationExtras);
    }
  }
}