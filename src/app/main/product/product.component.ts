import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/interfaces/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public isLoading = false;
  public products: ProductModel[];
  public totalProducts: number;
  public searchTitle: string;

  constructor(private router: Router,
              private productService: ProductService, 
              private cartService : CartService,
              private toasterService: ToasterService,
              ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.productService.fetchProducts()
      .subscribe(
        (products: ProductModel[]) => {
          this.isLoading = false;
          this.products = products;
          this.productService.productsList = products;
        }
      );
  }

  public onEdit(id: number): void {
    this.router.navigateByUrl(`/product/edit/${id}`);
  }

  public onDelete(id: number): void {
    this.productService.deleteProduct(id).subscribe(
      () => {
        this.toasterService.showSuccess('Product Deleted Successfully',this.products[id].title);
        this.products.splice(id, 1);
      },
      (error) => {
        this.toasterService.showError('Error', error);
      }
    );
  }

  public onAddtoCart(index: number): void{
    this.cartService.addToCart(index,this.products[index]).subscribe(
      () => {
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
}
