import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductModel } from '../../interfaces/product.model';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  public isLoading = false;
  public products: ProductModel[];
  public totalProducts: number;
  public searchTitle: string;
  public page:number;
  public subscription: Subscription;

  constructor(private router: Router,
              private productService: ProductService, 
              private cartService : CartService,
              private toasterService: ToasterService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.subscription = this.productService.fetchProducts()
      .subscribe(
        (products: ProductModel[]) => {
          this.isLoading = false;
          console.log(products);
          this.products = products;
          this.productService.productsList = products;
        }
      );
    
  }

  public onEdit(id: number): void {
    this.router.navigateByUrl(`/product/edit/${id-1}`);
  }

  public onDelete(id: number): void {
    this.subscription = this.productService.deleteProduct(id).subscribe(
      (resdata) => {
        console.log(resdata);
        this.toasterService.showSuccess('Product Deleted Successfully',resdata.title);
        this.products = this.products.filter(
          (value) => value.id !== id
        );
      },
      (error) => {
        this.toasterService.showError('Error', error);
      }
    );
  }

  public onAddtoCart(id: number): void{
    let index=id-1;
    this.subscription = this.cartService.addToCart(this.products[index]).subscribe(
      (data) => {
        console.log(data);
        this.toasterService.showSuccess(
          this.products[index].title,
          'Added to the cart'
        );
      },
      (error) => {
        this.toasterService.showError('Error', error);
      }
    );
  }

  public resetPage(){
    this.page=1;

  }
  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
