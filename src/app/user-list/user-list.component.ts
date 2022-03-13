import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private apiService: ApiserviceService) { }

  userList: any = []
  ngOnInit(): void {
    this.getUserlist('users')
  }

  getUserlist(url: string) {
    this.apiService.get(url).subscribe(data => {
      this.userList = data
    })
  }

}
