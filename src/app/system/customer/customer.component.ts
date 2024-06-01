import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/_services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(
    private authService:AuthService
  ) { }

  ngOnInit(): void {
  }
  public home() {
    window.location.href = environment.xilontechPortal
    this.authService.logout()
  }

}
