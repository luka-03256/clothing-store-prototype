import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit, OnDestroy {
  currentUser!: User;
  profileForm!: FormGroup;
  private userSubscription: Subscription | undefined;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.subscribeToUserChanges();
  }

  ngOnDestroy(): void {
    this.unsubscribeFromUserChanges();
  }

  private subscribeToUserChanges(): void {
    this.userSubscription = this.authenticationService.user.subscribe(
      (user) => {
        this.currentUser = user;
        if (this.currentUser) {
          this.setFormValues();
        }
      }
    );
  }

  private unsubscribeFromUserChanges(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  private setFormValues(): void {
    if (this.currentUser) {
      this.profileForm.patchValue({
        id: this.currentUser.id,
        // firstName: this.currentUser.firstName,
        // lastName: this.currentUser.lastName,
        username: this.currentUser.username,
        email: this.currentUser.email,
        // phoneNumber: this.currentUser.phoneNumber,
        // address: this.currentUser.address,
        password: this.currentUser.password
      });
    }
  }

  private initForm(): void {
    this.profileForm = this.formBuilder.group({
      id: [''],
      // firstName: ['', Validators.required],
      // lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      // phoneNumber: ['', Validators.required],
      // address: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  onSubmit(evt: Event): void {
    if (this.profileForm.valid) {
      const updatedUser = this.profileForm.value;
      this.authenticationService.updateUser(updatedUser).subscribe({
        next: (response) => {
          console.log('Profile updated successfully');
          alert('Profile updated successfully');
        },
        error: (error) => {
          console.log('Error updating profile:', error);
          alert('Error updating profile: ' + error);
        }
      });
    } else {
      console.log(this.profileForm.controls['firstName'].valid);
      console.log('Form is not valid');
    }
  }


}

