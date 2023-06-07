import { Component } from '@angular/core';
import { UserManagementService } from 'src/app/shared/services/user-management.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username = ""
  password = ""

  constructor(private userService: UserManagementService) {}

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
