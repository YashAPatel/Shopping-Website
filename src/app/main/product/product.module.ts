import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchFilterPipe } from '../../core/pipes/search-filter.pipe';
import { SharedModule } from '../../core/shared.module';
import { AuthGuard } from '../../guards/auth.guard';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductComponent } from './product.component';

@NgModule({
  declarations: [
    ProductComponent,
    ProductEditComponent,
    SearchFilterPipe,
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
    NgxPaginationModule,
    SharedModule,
  ],
})
export class ProductModule {}