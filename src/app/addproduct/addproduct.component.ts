import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { CommonModule, NgFor } from '@angular/common'
import { FormsModule, NgForm } from '@angular/forms'
import { ProductService } from '../services/product.service'

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [
    CommonModule, 
    NgFor,
    FormsModule
  ],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})

export class AddproductComponent implements OnInit {
  newProduct: any = {
    name: '',
    description: '',
    price: 0,
    category: '',
    available: false
  }

  categories: any[] = []
  products: any[] = []

  formError: boolean = false

  constructor(private http: HttpClient, private service: ProductService) {}

  ngOnInit(): void {
    this.fetchCategories()
  }

  onSubmit(form: NgForm) {  
    if (!this.newProduct.name.trim() ||
        !this.newProduct.description.trim() ||
        this.newProduct.price <= 0 ||
        !this.newProduct.category.trim()) {
      this.formError = true
      return
    }

    this.service.addProduct(this.newProduct)
    this.newProduct = {
      name: '',
      description: '',
      price: 0.0,
      category: '',
      available: false
    };
    form.resetForm()
    this.formError = false
  }  

  fetchProducts() {
    this.service.getProducts().subscribe({
      next: (response) => {
        this.products = response
      },
      error: (error) => {
        console.error('Error fetching products:', error)
      }
    })
  }
  
  fetchCategories() {
    this.service.getCategories().subscribe({
      next: (response: any) => {
        this.categories = response
      },
      error: (error) => {
        console.error('Error fetching categories:', error)
      }
    })
  }

}
