import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'http://localhost:8080/api/products'
  private categoriesUrl = 'http://localhost:8080/api/categories'

  private productsSubject = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {
    this.fetchProducts()
  }

  private getHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
    });
  }

  getProducts() {
    return this.productsSubject.asObservable();  
  }

  fetchProducts() {
    this.http.get<any[]>(this.productsUrl, { headers: this.getHeaders() }).subscribe(
      (response) => {
        this.productsSubject.next(response);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  addProduct(product: any) {
    this.http.post(this.productsUrl, product, { headers: this.getHeaders() }).subscribe(
      (response) => {
        const updatedProducts = [...this.productsSubject.getValue(), response];
        this.productsSubject.next(updatedProducts);
      },
      (error) => {
        console.error('Error adding product:', error);
      }
    );
  }

  removeProduct(productId: number) {
    return this.http.delete<any[]>(`${this.productsUrl}/${productId}`, { headers: this.getHeaders() })
  }

  updateProduct(updatedProduct: any) {
    return this.http.put<any>(`${this.productsUrl}/${updatedProduct.id}`, updatedProduct, { headers: this.getHeaders() });
  }

  getCategories() {
    return this.http.get(this.categoriesUrl, { headers: this.getHeaders() })
  }

}
