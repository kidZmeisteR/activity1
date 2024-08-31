import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get(`${this.baseUrl}/products`);
  }

  getProductById(id: number) {
    return this.http.get(`${this.baseUrl}/products/${id}`);
  }

  getProductsLimited(limit: number) {
    return this.http.get(`${this.baseUrl}/products?limit=${limit}`);
  }

  getSortedProducts(sortBy: string) {
    return this.http.get(`${this.baseUrl}/products?sort=${sortBy}`);
  }

  getAllCategories() {
    return this.http.get(`${this.baseUrl}/products/categories`);
  }

  getProductsInCategory(category: string) {
    return this.http.get(`${this.baseUrl}/products/category/${category}`);
  }

  addProduct(product: any) {
    return this.http.post(`${this.baseUrl}/products`, product);
  }

  updateProduct(id: number, product: any) {
    return this.http.put(`${this.baseUrl}/products/${id}`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.baseUrl}/products/${id}`);
  }
}
