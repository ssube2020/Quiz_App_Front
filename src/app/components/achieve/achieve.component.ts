import { Component, OnInit } from '@angular/core';
import { AchieveModel } from 'src/app/shared/models/achieve';
import { ExecutionResult } from 'src/app/shared/models/execution-result';
import { AchieveService } from 'src/app/shared/services/achieve.service';
import { UserManagementService } from 'src/app/shared/services/user-management.service';

@Component({
  selector: 'app-achieve',
  templateUrl: './achieve.component.html',
  styleUrls: ['./achieve.component.css']
})
export class AchieveComponent implements OnInit {

  achieve: AchieveModel[] = []

  constructor(private achieveService: AchieveService,
    private userService: UserManagementService) { }

  ngOnInit(): void {
    this.getAchieve()
  }

  public get isLoggedIn():boolean {
    return this.userService.isLoggedIn
  }

  private getAchieve() {
    this.achieveService.getAchieve().subscribe({
      next: (data : ExecutionResult) => {
        this.achieve = data.data;
        console.log(this.achieve)
      }
    });
  }

}
