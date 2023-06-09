import { Component, OnInit } from '@angular/core';
import { UserManagementService } from './shared/services/user-management.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Quote_Quiz_App';
  username = ""
  password = ""
  constructor(private userService: UserManagementService) { }

  ngOnInit(): void {
    
  }

  public login(): void {
    this.userService.login({userName:this.username, password: this.password}).subscribe(
      res=> {
        console.log(res)
      }
    )
  }

  public get isLoggedIn():boolean {
    return this.userService.isLoggedIn
  }

  public get isAdmin():boolean {
    const token = localStorage.getItem('token');
    if(!token || token.length == 0) {
      return false
    }
    return (jwt_decode.default(token) as {Role: string}).Role == "Admin"
  }

}
