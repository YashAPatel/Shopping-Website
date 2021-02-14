import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchFilterPipe } from 'src/app/core/pipes/search-filter.pipe';
import { SharedModule } from 'src/app/core/shared.module';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductComponent } from './product.component';

@NgModule({
  declarations: [
    ProductComponent,
    ProductEditComponent,
    SearchFilterPipe
  ],
  imports: [
    RouterModule.forChild([
      { path: '', component: ProductComponent },
      {
        path: 'edit/:id',
        canActivate: [AuthGuard],
        component: ProductEditComponent
      },
    ]),
    SharedModule,
  ],
})
export class ProductModule {}