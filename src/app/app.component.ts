import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from './apiservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(public apiService: ApiserviceService, private router: Router) {

  }

  logOut() {
    console.log("hi")
    localStorage.clear()
    this.router.navigateByUrl('/login')
  }
}
