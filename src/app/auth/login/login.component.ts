import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;

  public isLoading = false;

  private subscription: Subscription;
  
  constructor(private AuthService: AuthService,
              private router: Router,
              private toasterService: ToasterService) {}

  ngOnInit(): void {
    let email: string;
    let password: string;
    this.loginForm = new FormGroup({
      'email': new FormControl(email,[
                    Validators.required,,
                    Validators.email,
                    Validators.pattern('^[a-z0-9_-]{6,16}$|^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
              ]),
      'password': new FormControl(password,[
                      Validators.required,
                      Validators.minLength(6)
              ]),
    });
  }

  public onSubmitForm(): void {
    this.isLoading = true;
    this.subscription = this.AuthService
      .loginUser(
            this.loginForm.value.email,
            this.loginForm.value.password
            )
      .subscribe(() => {
            this.toasterService
              .showSuccess(
                'Welcome ' + this.loginForm.value.email,
                'Login successfull !!',
              );
              this.isLoading = false;
              this.router.navigate(['/product']);
            },
            (error) => {
              this.toasterService.showError('Login Failed !!', error);
              this.isLoading = false;
            }
        );
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
