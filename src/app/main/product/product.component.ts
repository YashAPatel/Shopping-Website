import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/interfaces/product.model';
import { CartService } from 'src/app/services/cart.service';
import { PagerService } from 'src/app/services/pager.service';
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
  public pager: any = {};
  public pagedItems: ProductModel[];

  constructor(private router: Router,
              private productService: ProductService, 
              private cartService : CartService,
              private toasterService: ToasterService,
              private pagerService: PagerService,
              ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.productService.fetchProducts()
      .subscribe(
        (products: ProductModel[]) => {
          this.isLoading = false;
          console.log(products);
          this.products = products;
          this.productService.productsList = products;
          this.setPage(1);
        }
      );
    
  }

  public setPage(page: number) {
    this.pager = this.pagerService.getPager(this.products.length, page);
    this.pagedItems = this.products.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  public onEdit(id: number): void {
    this.router.navigateByUrl(`/product/edit/${id}`);
  }

  public onDelete(id: number): void {
    this.productService.deleteProduct(id).subscribe(
      (resdata) => {
        console.log(resdata);
        this.toasterService.showSuccess('Product Deleted Successfully',this.products[id].title);
        this.products.splice(id, 1);
        this.setPage(this.pager.currentPage);
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
        this.setPage(this.pager.currentPage);
      },
      (error) => {
        this.toasterService.showError('Error', error);
      }
    );
  }
}
