import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  firstNameFormControl = new FormControl('', [Validators.required, Validators.email]);
  lastNameFormControl = new FormControl('', [Validators.required, Validators.email]);
  phoneNumberFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.email]);

  response : String = "";
  errorMessage = '';
  success = '';
  logedUser : boolean = false;
  logedAdmin : boolean = false;
  user = new User;

  constructor(public router: Router, public authService: AuthService) { }

  ngOnInit(): void {
  }


  onSubmit() {
    this.response = "";
    console.log(this.user);
    
    this.authService.login(this.user).subscribe(
      data => {
        localStorage.setItem("user", JSON.stringify(data));
        console.log(data);
        this.success = data;
        if(data.role == 'admin') {
          HeaderComponent.assignedUserRole(true);
          this.router.navigate(['']);
        }
        else {
          this.router.navigate(['']);
        }
      },
      error => {
        this.errorMessage = error.error;
      }
      );
  
  }

}
