import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { HomeComponent } from './home/home.component'
import { WelcomeComponent } from './welcome/welcome.component'
import { ProductsComponent } from './products/products.component'
import { AddproductComponent } from './addproduct/addproduct.component'

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
        { path: 'welcome', component: WelcomeComponent },
        { path: 'products', component: ProductsComponent },
        { path: 'addproduct', component: AddproductComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
