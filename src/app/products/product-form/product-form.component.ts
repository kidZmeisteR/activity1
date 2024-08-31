import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ApiServiceService } from '../../services/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [ApiServiceService],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;

  constructor(private apiService: ApiServiceService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      decription: [''],
      image: ['', Validators.required]
    });

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.apiService.getProductById(id).subscribe(data => {
        this.productForm.patchValue(data);
      });
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      const id = this.route.snapshot.params['id'];
      if (id) {
        this.apiService.updateProduct(id, this.productForm.value).subscribe(() => {
          this.router.navigate(['/products']);
        });
      } else {
        this.apiService.addProduct(this.productForm.value).subscribe(() => {
          this.router.navigate(['/products']);
        });
      }
    }
  }

  goBack() {
    window.history.back();
  }

}
