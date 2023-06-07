import { Component } from '@angular/core';
import { SwitcherService } from 'src/app/shared/services/switcher.service';
import { UserManagementService } from 'src/app/shared/services/user-management.service';

@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.css']
})
export class SwitcherComponent {

  constructor(private switcherService: SwitcherService,
    private userService: UserManagementService) {}

  public get isLoggedIn():boolean {
    return this.userService.isLoggedIn
  }

  protected changeMode(type: boolean) {
    this.switcherService.changeMode(type)
  }


}
