import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [LoadingSpinnerComponent],
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    LoadingSpinnerComponent, 
    CommonModule, 
    ReactiveFormsModule,
    FormsModule
  ],
})
export class SharedModule {}