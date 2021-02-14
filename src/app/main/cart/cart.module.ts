import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartComponent } from './cart.component';
import { SharedModule } from 'src/app/core/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CartComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: CartComponent },
    ]),
    SharedModule,
    FormsModule
  ],
})
export class CartModule { }
