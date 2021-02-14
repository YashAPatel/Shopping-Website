import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../core/shared.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: LoginComponent},
    ]),
    SharedModule,
  ],
})
export class AuthModule { }
