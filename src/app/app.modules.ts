import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterOutlet, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { LoginComponent } from './login/login.component'
import { WelcomeComponent } from './welcome/welcome.component'
import { ProductsComponent } from './products/products.component'
import { AddproductComponent } from './addproduct/addproduct.component'
import { FooterComponent } from './footer/footer.component'
import { ProductService } from './services/product.service'
import { MatIconModule } from '@angular/material/icon'
import { AuthService } from './services/auth.service'

@NgModule({
  declarations: [],
  imports: [
    RouterModule,
    RouterOutlet,
    BrowserModule,
    CommonModule,
    MatIconModule,
    LoginComponent,
    WelcomeComponent,
    AddproductComponent,
    ProductsComponent,
    FooterComponent,
  ],
  providers: [ProductService, AuthService],
  bootstrap: []
})
export class AppModule { }
