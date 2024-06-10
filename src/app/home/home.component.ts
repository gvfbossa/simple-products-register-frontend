import { Component, OnInit } from '@angular/core'
import { WelcomeComponent } from '../welcome/welcome.component'
import { ProductsComponent } from '../products/products.component'
import { AddproductComponent } from '../addproduct/addproduct.component'
import { FooterComponent } from '../footer/footer.component'
import { CommonModule } from '@angular/common'
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    WelcomeComponent,
    ProductsComponent,
    AddproductComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private authservice: AuthService) {}

  currentUserRole: string = ''

  ngOnInit(): void {
    this.currentUserRole = this.authservice.getUserRole()
  }

}
