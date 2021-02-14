import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartModel } from '../interfaces/cart.model';
import { ProductModel } from '../interfaces/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  URL='https://fakestoreapi.com/carts/';
  
  constructor(private http: HttpClient) {}

  public getCarts(): Observable<CartModel[]>{
    return this.http.get<CartModel[]>(this.URL);
  }

  public getCartByUserId(userId: number): Observable<CartModel[]>{
    return this.http.get<CartModel[]>(this.URL+'/user/'+userId);
  }

  public addToCart(index: number, addingProduct: ProductModel){
    return this.http.put('https://fakestoreapi.com/carts/1', {
      userid: 3,
      date: '2019-12-10',
      product: [{ productId: addingProduct.id, quantity: 3 }],
    });
  }
  
  public removeProduct(index: number) {
    return this.http.delete('https://fakestoreapi.com/products/' + index);
  }

  public changeProductQuantity(userId: number,index: number, productQuantity: number) {
    return this.http.put('https://fakestoreapi.com/carts/1', {
      userId: userId,
      date: '2019-12-10',
      products: [{ productId: index, quantity: productQuantity }],
    });
  }
}