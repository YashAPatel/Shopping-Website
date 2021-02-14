import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserLoginModel } from '../interfaces/userlogin.model';
import { ErrorHandlingService } from './error-handling.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  newUser: UserLoginModel = {
    email: null,
    token: null,
  };
  user = new BehaviorSubject<UserLoginModel>(null);

  constructor(private http: HttpClient, 
              private router: Router,
              private errorHandlingService: ErrorHandlingService) {}

  public loginUser(email: string, password: string): Observable<UserLoginModel> {
    return this.http
      .post<UserLoginModel>('https://reqres.in/api/login', {
        email: email,
        password: password,
      })
      .pipe(
        catchError(this.errorHandlingService.handleError),
        tap((resData) => {
          this.newUser.email = email;
          this.newUser.token = resData.token;
          resData.email = email;
          this.user.next(this.newUser);
          localStorage.setItem('userData', JSON.stringify(this.newUser));
        })
      );
  }

  public logoutUser(): void {
    this.user.next(null);
    localStorage.removeItem('userData');
  }

  public autoLogin() {
    const userData: {
      email: string;
      token: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    if (userData.token) {
      this.user.next(userData);
      this.router.navigate(['/product']);
    }
  }
}