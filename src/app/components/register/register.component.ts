import { Component } from '@angular/core';
import { UserManagementService } from 'src/app/shared/services/user-management.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  username = ""
  password = ""

  constructor(private userService: UserManagementService) {
    
  }

  public register(): void {
    this.userService.register({userName:this.username, password: this.password}).subscribe(
      res=> {
        console.log(res)
      }
    )
  }

}
