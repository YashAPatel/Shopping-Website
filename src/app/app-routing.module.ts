import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoggedInGuard } from './guards/loggedIn.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    canActivate:[LoggedInGuard],
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'product',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./main/product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'cart',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./main/cart/cart.module').then((m) => m.CartModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}