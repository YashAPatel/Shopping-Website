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

  public addToCart(addingProduct: ProductModel){
    const date =new Date();
    const cart: CartModel={id:1,userId: 1, date: date, products: [{ productId: addingProduct.id, quantity: 3 }]};
    return this.http.put('https://fakestoreapi.com/carts/1',cart);
  }
  
  public removeProduct(index: number) {
    return this.http.delete('https://fakestoreapi.com/products/' + index);
  }

  public changeProductQuantity(userId: number,index: number, productQuantity: number) {
    const date =new Date();
    const cart: CartModel={id:1,userId: userId, date: date, products: [{ productId: index, quantity: productQuantity }]};
    return this.http.put('https://fakestoreapi.com/carts/1',cart);
  }
}