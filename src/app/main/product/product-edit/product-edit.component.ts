import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductModel } from '../../../interfaces/product.model';
import { ProductService } from '../../../services/product.service';
import { ToasterService } from '../../../services/toaster.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, OnDestroy {

  public isLoading: boolean = false;
  public editMode: boolean = false;

  public editForm: FormGroup;

  public updatingProductId: number = undefined;
  private subscription: Subscription;

  public updatingProduct: ProductModel = null;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private productService: ProductService,
              private toasterService: ToasterService) {}

  ngOnInit(): void {
      this.subscription = this.route.params 
        .subscribe(
          (params: Params) => {
            if(params['id']==='new')
            {
              this.initForm();
            } else {
              this.updatingProductId = +params['id'];
              this.editMode = params['id'] != null;
              console.log(this.editMode);
              this.initForm();
            }
          }
        ); 
    }

    private initForm(): void{
      let productTitle: string;
      let productCategory: string;
      let productPrice: string;
      let productDescription: string;
      if(this.editMode){
        this.updatingProduct=this.productService.productsList[this.updatingProductId];
        setTimeout(() => {
          this.editForm.setValue({
            productTitle: this.updatingProduct.title,
            productCategory: this.updatingProduct.category,
            productPrice: this.updatingProduct.price,
            productDescription: this.updatingProduct.description,
          });
        });
      }
      this.editForm = new FormGroup({
        'productTitle': new FormControl(productTitle,Validators.required),
        'productCategory': new FormControl(productCategory,Validators.required),
        'productPrice': new FormControl(productPrice,Validators.required),
        'productDescription': new FormControl(productDescription,Validators.required)
      });
    }
    
  public onSubmitForm() : void {
    this.isLoading = true;
    this.setProduct();
    if(this.editMode){
      this.setProduct();
      this.subscription = this.productService
        .updateProduct(this.updatingProductId, this.updatingProduct)
        .subscribe(() =>{
          this.editMode=false;
          this.router.navigate(['/product']);
          this.toasterService.showSuccess(this.updatingProduct.title,'Product is Updated');
        },
        (error) => {
          this.toasterService.showError('Error', error);
        }
      );
    } else {
      this.subscription = this.productService
        .addProduct(this.updatingProduct)
        .subscribe(() => {
            this.router.navigate(['/product']);
            this.toasterService.showSuccess(this.updatingProduct.title,'New Product is Added');
          },
          (error) => {
            this.toasterService.showError('Error', error);
          }
      );
    }
  }

  public onCancel() : void {
    this.editMode=false;
    this.router.navigate(['/product']);
  }

  private setProduct() : void {
    this.updatingProduct = {
      id: 1,
      title: this.editForm.value.productTitle,
      category: this.editForm.value.productCategory,
      price: this.editForm.value.productPrice,
      description: this.editForm.value.Productdescription,
      image: 'null',
    };
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
