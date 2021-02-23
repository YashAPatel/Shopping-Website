import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartModel } from '../../interfaces/cart.model';
import { ProductModel } from '../../interfaces/product.model';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  public isLoading = false;
  public userForm: FormGroup;
  public isSubmit = false;

  public carts : CartModel[] = [];
  public cart: CartModel[] = [];
  public userIdsCart: number;
  public products: ProductModel [] = [];
  public product: ProductModel[]=[];

  public subscription : Subscription;
 
  constructor(private router: Router,
              private cartService: CartService,
              private productService: ProductService,
              private toasterService: ToasterService) { }

  ngOnInit(): void {
    let userId: number;
    this.userForm = new FormGroup({
      'userId': new FormControl(userId,Validators.required),
    });
    this.subscription = this.cartService.getCarts().subscribe(
      resData=>{
        this.carts=resData;
      }
    );
    this.subscription=this.productService.fetchProducts().subscribe(
      resData=>{
        this.product=resData;
      }
    );
  }

  public onSubmitForm(): void{
    this.products=[];
    this.isLoading = true;
    this.isSubmit = true;
    this.userIdsCart=this.userForm.get('userId').value;
    this.subscription = this.cartService.getCartByUserId(this.userIdsCart).subscribe(
      resData=>{
        this.cart=resData;
        if(resData.length==0){
          this.toasterService.showError('Data not found!!', 'User does not have cart !!');
          this.isLoading = false;
        }
        if(this.isLoading){
          this.cart[0].products.forEach(element => {
            this.subscription = this.productService.getProduct(+element.productId).subscribe(
              resData=>{
                this.products.push(resData);
                /* this.products.map(function(x) { 
                  x.quantity = +element.quantity; 
                }); */
                this.isLoading = false;
              }
            ); 
          });
        }
      }
    );
  }

  public onRemoveProduct(index: number) : void {
    this.subscription = this.cartService.removeProduct(index).subscribe(
      () => {
        this.toasterService.showSuccess('Product Removed Successfully',this.products[index].title);
        this.products.splice(index, 1);
      },
      (error) => {
        this.toasterService.showError('Error', error);
      }
    );
  }

  public onChangeProductQuantity(index: number,productQuantity: HTMLInputElement) : void {
    this.subscription = this.cartService.changeProductQuantity(this.userIdsCart,index, +productQuantity.value).subscribe(
      ()=>{
        this.toasterService.showInfo("Product updated",'In User ID: '+this.userIdsCart);
      },
      (error)=>{
        this.toasterService.showError('Error',error);
      }
    );
  }

  public onCancel() : void {
    this.router.navigate(['/product']);
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
