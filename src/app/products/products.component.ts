import { Component, OnInit } from '@angular/core'
import { CommonModule, NgFor } from '@angular/common'
import { MatIcon } from '@angular/material/icon'
import { ProductService } from '../services/product.service'
import { AuthService } from '../services/auth.service'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule, 
    NgFor,
    FormsModule,
    MatIcon
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = []
  categories: any[] = []

  sortedColumn: string = ''
  sortDirection: number = 1

  currentUserRole: string = ''

  constructor(private service: ProductService, private authservice: AuthService) {}

  ngOnInit(): void {
    this.fetchProducts()
    this.fetchCategories()
    this.currentUserRole = this.authservice.getUserRole()
  }

  fetchProducts(): void {
    this.service.getProducts().subscribe({
      next: (products) => {
        this.products = products.map(product => ({
          ...product,
          editMode: false
        }))
      },
      error: (error) => {
        console.error('Error fetching products:', error)
      }
    });
  }  

  updateProduct(product: any): void {
    const updatedProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      available: product.available
    }
  
    this.service.updateProduct(updatedProduct).subscribe({
      next: (response) => {
        this.fetchProducts()
        const index = this.products.findIndex(p => p.id === product.id)
        if (index !== -1)
          this.products[index] = response
      },
      error: (error) => {
        console.error('Error updating product:', error)
      }
    })
  }
  
  deleteProduct(product: any): void {
    this.service.removeProduct(product.id).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id !== product.id);
      },
      error: (error) => {
        console.error('Error deleting product:', error);
      }
    });
  }  

  toggleEditMode(product: any): void {
    product.editMode = !product.editMode
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

  sortColumn(column: string): void {
    if (this.sortedColumn === column)
      this.sortDirection = -this.sortDirection
    else {
      this.sortDirection = 1
      this.sortedColumn = column
    }
  
    this.products.sort((a, b) => {
      const valA = column === 'category' ? a[column]?.name : a[column]
      const valB = column === 'category' ? b[column]?.name : b[column]
      
      if (column === 'available') {
        const availabilityA = a[column] ? 1 : 0
        const availabilityB = b[column] ? 1 : 0
        return (availabilityA - availabilityB) * this.sortDirection
      }
  
      if (valA < valB)
        return -1 * this.sortDirection
      if (valA > valB)
        return 1 * this.sortDirection
      
      return 0
    })
  }

}
