import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required]);
  firstNameFormControl = new FormControl('', [Validators.required]);
  lastNameFormControl = new FormControl('', [Validators.required]);
  phoneNumberFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);

  errorMessage = '';
  success = '';

  signupForm!: FormGroup;
  user = new User;
  
  constructor(public router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
    emailFormControl : new FormControl('', [Validators.required]),
    firstNameFormControl : new FormControl('', [Validators.required]),
    lastNameFormControl : new FormControl('', [Validators.required]),
    phoneNumberFormControl : new FormControl('', [Validators.required]),
    passwordFormControl : new FormControl('', [Validators.required])
    })
  }

  onSubmit(): void {

    this.authService.signup(this.user).subscribe(
      data => {
        console.log(data);
        this.success = data;
        this.router.navigate(['/login']);
      },
      error => {
        this.errorMessage = error.error;
      }
    );
  }

}
