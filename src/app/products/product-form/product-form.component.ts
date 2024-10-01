import { Component } from '@angular/core';
import { Product } from '../product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-product',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  productForm!: FormGroup;
  isNewProduct = true;
  productId!: number;
  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id')) || 0;
    this.isNewProduct = !this.productId;
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      date: [null, Validators.required],
      category: ['', Validators.required]
    });
    if (!this.isNewProduct) {
      const existingProduct = this.productService.getProductById(this.productId);
      if (existingProduct) {
        this.productForm.patchValue(existingProduct);
      } 
    }
  }
  onSubmit(): void {
    const product: Product = this.productForm.value;
    if (this.isNewProduct) {
      this.productService.saveProduct(product);
      this._snackBar.open('Product Added Successfully !!', 'Success', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    } else {
      product.id = this.productId;
      this.productService.saveProduct(product);
    }
    this.router.navigate(['/products']);
  }
  onCancel(){
    this.router.navigate(['/products']);
  }
}
