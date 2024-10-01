import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Product } from './product';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../common-components/confirmation-dialog/confirmation-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements AfterViewInit {
  products: Product[] = [];
  displayedColumns: string[] = ['title', 'description', 'status','date', 'category', 'actions']; // Add more column names as needed
  dataSource!: MatTableDataSource<Product>;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private productService: ProductsService,
              private router: Router,
              private dialog: MatDialog,
              private _snackBar : MatSnackBar) {}
  ngOnInit(): void {
    this.refreshTable();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  refreshTable(): void {
    this.products = this.productService.getAllProducts();
    this.dataSource = new MatTableDataSource(this.products);
  }
  applyFilter(event: Event): void {
    this.dataSource.filter = (event.target as HTMLTextAreaElement).value?.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  addProduct(){
    this.router.navigate(['/products/add-product'])
  }
  editProduct(productId: Product): void {
    this.router.navigate(['/products/edit-product/'+productId.id])
  }
  deleteProduct(productId: Product): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: {
        title: 'Delete Confirmation',
      }
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if (result) {
        this.productService.deleteProduct(productId.id);
        this.refreshTable();
      }
    });
  }
}
