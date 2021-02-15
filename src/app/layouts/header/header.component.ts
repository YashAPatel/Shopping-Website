import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private subscription: Subscription;

  isUserValid = false;

  constructor(private AuthService: AuthService,
              private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.AuthService.user.subscribe(
                            (user) => {
                              this.isUserValid = !!user;
                            }
                          );
  }

  public loggingButton() : void{
    if(this.isUserValid){
      this.AuthService.logoutUser();
    }
    else if(!this.isUserValid){
      this.router.navigateByUrl(`/auth`);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
