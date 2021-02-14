import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../interfaces/product.model';
import { Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ErrorHandlingService } from './error-handling.service';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private URL = 'https://fakestoreapi.com/products/';
  private productsChanged = new Subject<ProductModel[]>();
  public product : ProductModel;
  public productsList: ProductModel[];
  constructor(private http: HttpClient,
              private errorHandlingService: ErrorHandlingService,
              private toasterService: ToasterService) {}

  public fetchProducts() {
    return this.http.get<ProductModel[]>(this.URL);
  }

  public getProduct(productId: number): Observable<ProductModel>{
    return this.http
      .get<ProductModel>(this.URL+productId)
      .pipe(
        catchError(this.errorHandlingService.handleError),
        tap((resData) => {
          if(JSON.stringify(resData)=='{}'){
            this.toasterService.showError('Data not found!!', 'Product does not have exist !!');
          }
        })
      );
  }

  public addProduct(newProduct: ProductModel){
    return this.http.post(this.URL, JSON.stringify({
      title: newProduct.title,
      price: newProduct.price,
      description: newProduct.description,
      image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
      category: newProduct.category,
    })).pipe(
      catchError(this.errorHandlingService.handleError)
    );
  }

  public updateProduct(index: number,updatedProduct: ProductModel){
    return this.http.put(this.URL + index,JSON.stringify({
      title: updatedProduct.title,
      price: updatedProduct.price,
      description: updatedProduct.description,
      image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
      category: updatedProduct.category,
    })).pipe(
      catchError(this.errorHandlingService.handleError)
    );
  }

  public deleteProduct(index: number){
    return this.http.delete(this.URL + index);
  }
}