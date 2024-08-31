import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { ApiServiceService } from '../../services/api-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [ApiServiceService],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit{
  products: any[] = [];
  filterForm!: FormGroup;

  private apiService = inject(ApiServiceService);
  private fb = inject(FormBuilder);
  constructor (private router: Router){}

  ngOnInit(): void {
    this.loadProducts();

    this.filterForm = this.fb.group({
      category: ['']
    });
  }

  loadProducts() {
    this.apiService.getAllProducts().subscribe(data => {
      this.products = data as any[];
    });
  }

  viewProduct(id: number) {
    this.router.navigate([`/products/${id}`]);
  }

  editProduct(id: number) {
    this.router.navigate([`/products/edit/${id}`]);
  }

  deleteProduct(id: number) {
    this.apiService.deleteProduct(id).subscribe({
      next: () => {
        this.loadProducts();
      }
    });
  }

  onFilterSubmit() {
    const category = this.filterForm.value.category;
    if (category) {
      this.apiService.getProductsInCategory(category).subscribe(data => {
        this.products = data as any[];
      });
    } else {
      this.loadProducts();
    }
  }

}
