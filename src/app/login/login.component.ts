import { Component } from '@angular/core'
import { FooterComponent } from '../footer/footer.component'
import { AuthService } from '../services/auth.service'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FooterComponent,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = ''
  password: string = ''

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (token) => {
        if (token)
          this.router.navigate(['/home'])
      },
      error: (error) => {
        console.error('Login failed:', error)
      }
    });
  }
  
}
