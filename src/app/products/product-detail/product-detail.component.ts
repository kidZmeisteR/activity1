import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ApiServiceService } from '../../services/api-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  providers: [ApiServiceService],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product: any;

  constructor(@Inject(ApiServiceService)private apiService: ApiServiceService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.apiService.getProductById(id).subscribe(data => {
      this.product = data;
    });
  }

  goBack() {
    window.history.back();
  }
}
