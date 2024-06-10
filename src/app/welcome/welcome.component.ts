import { Component, OnInit } from '@angular/core'
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {
  currentUserRole: string = ''

  constructor(private authservice: AuthService) { }

  ngOnInit(): void {
    this.currentUserRole = this.authservice.getUserRole();
  }

  logout(): void {
    this.authservice.logout()
  }

}
