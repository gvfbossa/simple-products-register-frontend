import { Component } from '@angular/core'
import { MatIcon } from '@angular/material/icon'
import { MatTooltip } from '@angular/material/tooltip'
import { FooterComponent } from '../footer/footer.component'
import { AuthService } from '../services/auth.service'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FooterComponent,
    FormsModule,
    MatIcon,
    MatTooltip
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = ''
  password: string = ''

  tooltipText: string = 'User: user - Password: 1234 \n User: admin - Password: admin'

  tooltipVisible: boolean = false
  
  constructor(private authService: AuthService, private router: Router) { }

  toggleTooltip(tooltip: MatTooltip): void {
    this.tooltipVisible = !this.tooltipVisible
    if (this.tooltipVisible) {
      tooltip.show()
    } else {
      tooltip.hide()
    }
  }

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
