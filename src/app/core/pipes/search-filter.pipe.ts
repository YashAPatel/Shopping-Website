import { Pipe, PipeTransform } from '@angular/core';
import { ProductModel } from 'src/app/interfaces/product.model';

@Pipe({
  name: 'SearchFilterPipe',
})
export class SearchFilterPipe implements PipeTransform {
  transform(product: ProductModel[], searchTitle: string): ProductModel[] {
    if (!product || !searchTitle) {
        return product;
    }
    return product.filter(item => item.title.toLowerCase().indexOf(searchTitle.toLowerCase()) !== -1);
  }
}